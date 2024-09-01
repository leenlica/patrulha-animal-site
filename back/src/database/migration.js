import Database from './database.js';

async function up() {
    const db = await Database.connect();

    const enderecoSql = `
    CREATE TABLE endereco (
      id_endereco INTEGER PRIMARY KEY AUTOINCREMENT,
      rua VARCHAR(40) NOT NULL,
      numero INTEGER NOT NULL,
      bairro VARCHAR(20) NOT NULL,
      cidade VARCHAR(40) NOT NULL,
      estado VARCHAR(2) NOT NULL,
      cep VARCHAR(10) NOT NULL
    )
  `;

    const petsSql = `
    CREATE TABLE pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(40),
      idade VARCHAR(25) NOT NULL,
      condicao_fisica VARCHAR(255) NOT NULL,
      especie VARCHAR(8) NOT NULL CHECK (especie IN ('Gato', 'Gata', 'Cachorro', 'Cachorra')),
      cpf_doa VARCHAR(14) NOT NULL
    )
  `;

    const usuarioSql = `
    CREATE TABLE usuario (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      cpf_doa VARCHAR(14) NOT NULL,
      nome VARCHAR(40) NOT NULL,
      email VARCHAR(45) NOT NULL,
      telefone_um VARCHAR(15) NOT NULL,
      endereco_id INTEGER NOT NULL,
      FOREIGN KEY (endereco_id) REFERENCES endereco (id_endereco)
    )
  `;

    const adocaoSql = `
    CREATE TABLE adocao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      pet_id INTEGER NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuario (id_usuario),
      FOREIGN KEY (pet_id) REFERENCES pets (id)
    )
  `;

    await db.run(enderecoSql);
    await db.run(petsSql);
    await db.run(usuarioSql);
    await db.run(adocaoSql);
}

export default { up };
