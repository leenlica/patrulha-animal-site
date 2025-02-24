import { describe, it, before } from 'node:test';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import prisma from "./database/database.js";
import assert from 'node:assert';
import request from 'supertest';
import server from "./index.js"; 

describe("Rotas de Pets", () => {
  it("Deve adicionar um novo pet com sucesso", async () => {
    const loginResponse = await request(server)
      .post("/signin")
      .send({ email: "hellen@gmail.com", password: "123456" });

    console.log("Resposta do login:", loginResponse.body); // Debug da resposta

    assert.ok(loginResponse.body.token, "Token JWT deve ser gerado");

    const token = loginResponse.body.token;

    const petResponse = await request(server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Bolt")
      .field("age", 3)
      .field("description", "Um cachorro muito amigável")
      .field("species", "Cachorro")
      .attach("image", ""); 

    console.log("Resposta da criação do pet:", petResponse.body); // Debug da resposta do pet

    assert.strictEqual(petResponse.status, 201, "Deve retornar status 201");
    assert.ok(petResponse.body.id, "O pet deve ser criado com um ID");
    assert.strictEqual(petResponse.body.name, "Bolt", "O nome deve ser Bolt");
  });
});

let validUser;
const invalidUser = {
  email: 'invalid@email.com',
  password: 'wrongpassword',
};

// Cria um usuário válido antes dos testes
before(async () => {
  const hash = crypto.randomBytes(8).toString('hex');
  validUser = {
    nome: `User-${hash}`,  
    email: `user-${hash}@test.com`,
    password: 'Test@1234',
  };

  const hashedPassword = await bcrypt.hash(validUser.password, 10);
  
  await prisma.user.create({
    data: {
      nome: validUser.nome,  
      email: validUser.email,
      password: hashedPassword,
    },
  });
});

describe('Sign in Endpoints', () => {
  describe('POST /signin', () => {
    it('should login a valid user', async () => {
      const response = await request(server) 
        .post('/signin')
        .send({
          email: validUser.email,
          password: validUser.password,
        });
      assert.strictEqual(response.statusCode, 200);
      assert.ok(response.body.auth, 'Auth should be true');
      assert.ok(response.body.token, 'Token should be returned');
    });

    it('should not login an unregistered user', async () => {
      const response = await request(server) 
        .post('/signin')
        .send(invalidUser);
      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.auth, false);
      assert.strictEqual(response.body.message, 'User not found');
    });

    it('should not login with incorrect password', async () => {
      const response = await request(server)  
        .post('/signin')
        .send({
          email: validUser.email,
          password: 'Wrong@123',
        });
      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.auth, false);
      assert.strictEqual(response.body.message, 'Invalid password');
    });

    it('should not login without email or password', async () => {
      const response = await request(server).post('/signin').send({});
    
      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(response.body.auth, false);
      assert.strictEqual(response.body.message, 'O email é obrigatório, A senha é obrigatória');
    });    
  });
});

function createValidUser() {
  const user = {
    password: '12345678',
    confirmationPassword: '12345678', 
  };

  const hash = crypto.randomBytes(8).toString('hex');
  user.nome = `Usuário ${hash}`;
  user.email = `user-${Date.now()}@email.com`;
  return user;
}

describe('User Registration', () => {
  let validUser;

  before(() => {
    validUser = createValidUser();
    console.log(validUser); 
  });

  describe('POST /users', () => {
    it('criar novo usuário', async () => {
      const response = await request(server).post('/users').send(validUser);
      assert.strictEqual(response.statusCode, 201);
      assert.ok(response.body.id_usuario);
    });

    /*it('criar usuário sem email', async () => {
      const { nome, password, confirmationPassword } = validUser;
      const response = await request(server).post('/users').send({ nome, password, confirmationPassword });
    
      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(response.body.error, "Email inválido");
    });*/
  });
});
