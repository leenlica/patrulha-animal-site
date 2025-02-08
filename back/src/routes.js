import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "./database/database.js";

import { isAuthenticated } from "./middleware/auth.js";
import { validate } from "./middleware/validate.js";

import SendMail from "./services/SendMail.js";

import multer from "multer";
import uploadConfig from "./config/multer.js";
import uploadPetConfig from "./config/multer.js";

import Pets from "./models/Pets.js";
import curtida from "./models/curtida.js";
import User from "./models/User.js";
import Image from "./models/Image.js";

class HTTPError extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}

const router = express.Router();

// Schemas de validação
const userSchema = z.object({
	nome: z.string().min(1, "Nome é obrigatório"),
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
	confirmationPassword: z
		.string()
		.min(6, "A confirmação da senha deve ter pelo menos 6 caracteres"),
});

const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

/*
const petSchema = z.object({
    name: z.string().optional(),
    imagem: z.string().url().optional(),
    age: z.number().min(0, 'Idade deve ser um número positivo'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    species: z.string().min(1, 'Espécie é obrigatória'),
});
*/

// Rota para criar user
router.post("/users", async (req, res) => {
	try {
		const { nome, email, password, confirmationPassword } =
			userSchema.parse(req.body);

		if (password !== confirmationPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

		const newUser = await User.create(nome, email, password);

		delete newUser.password;

		res.status(201).json(newUser);

		await SendMail.createNewUser(newUser.email);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Unable to create user" });
	}
});

// Rota de login
router.post("/signin", async (req, res) => {
	try {
		const { email, password } = loginSchema.parse(req.body);

		const user = await prisma.user.findUnique({
			where: { email: email },
		});

		if (!user) {
			return res
				.status(401)
				.json({ auth: false, message: "User  not found" });
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return res
				.status(401)
				.json({ auth: false, message: "Invalid password" });
		}

		// Gerar um token JWT
		const token = jwt.sign(
			{ id_usuario: user.id_usuario },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		const { password: _, ...userData } = user;
		// Retornar token e dados do usuário
		return res.json({
			auth: true,
			token,
			user: userData,
		});
	} catch (error) {
		console.error("Erro durante o login:", error);
		res.status(500).json({ auth: false, message: "Internal server error" });
	}
});

router.get("/users/me", isAuthenticated, async (req, res) => {
	try {
		const userId = req.id_usuario;

		const user = await User.readById(userId);
		console.log("User:", user);

		delete user.password;

		return res.json(user);
	} catch (error) {
		throw new HTTPError("Unable to find user", 400);
	}
});

// Rota para obter todos os usuários
router.get("/users", async (req, res) => {
	try {
		const users = await User.read();
		return res.status(200).json(users);
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		return res.status(500).json({ error: "Erro ao buscar usuários" });
	}
});

// Rota para deletar um usuário pelo ID
router.delete("/users/:id", isAuthenticated, async (req, res) => {
	try {
		const { id } = req.params;

		if (await User.remove(id)) {
			return res.sendStatus(204);
		} else {
			throw new Error();
		}
	} catch (error) {
		console.error("Erro ao remover usuário:", error);
		throw new HTTPError("Unable to remove user", 400);
	}
});

// Rota para obter todos os pets

router.get("/pets", async (req, res) => {
	try {
		const pets = await Pets.read();
		res.json(pets);
	} catch (error) {
		console.error("Erro ao buscar pets:", error);
		res.status(500).json({ error: "Erro ao buscar pets." });
	}
});

// Rota para obter um pet específico por ID
router.get("/pets/:id", isAuthenticated, async (req, res) => {
	const { id } = req.params.id;
	const pet = await Pets.find((p) => p.id === id);
	if (!pet) {
		return res.status(404).json({ message: "Pet não encontrado" });
	}
	res.json(pet);
});

// Rota para adicionar um novo pet
router.post(
	"/pets",
	isAuthenticated,
	multer(uploadConfig).single("image"),
	async (req, res) => {
		const { name, age, description, species } = req.body;
		const userId = req.userId; // Acessa o userId do middleware
		const imagem = `./img/profile/${req.file.filename}`;
		console.log(req.body);
		console.log(imagem);

		try {
			// Criação do pet
			const newPet = await Pets.create({
				name,
				imagem,
				age,
				description,
				species,
				user_id: userId, // Atribuindo user_id ao pet
			});

			// Buscar o e-mail do usuário associado ao pet
			const user = await prisma.user.findUnique({
				where: { id_usuario: userId },
				select: { email: true },
			});

			if (user && user.email) {
				// Enviar e-mail ao usuário (associado ao pet)
				await SendMail.createNewPet(user.email);
			} else {
				console.error("E-mail do usuário não encontrado.");
			}

			// Retornar a resposta com o pet criado
			res.status(201).json(newPet);
			res.json({ message: "Pet adicionado com sucesso." });
		} catch (error) {
			console.error("Erro ao adicionar pet:", error);
			res.status(500).json({ error: "Erro ao adicionar pet." });
		}
	}
);

// Rota para atualizar um pet existente pelo id
router.put("/pets/:id", isAuthenticated, async (req, res) => {
	const id = req.params.id;
	const { name, imagem, species, age, description } = req.body;

	const petIndex = await Pets.findIndex((p) => p.id === id);
	if (petIndex === -1) {
		return res.status(404).json({ message: "Pet não encontrado" });
	}

	const updatedPet = {
		id,
		name,
		imagem,
		species,
		age,
		description,
	};

	Pets[petIndex] = updatedPet;
	res.json(updatedPet);
});

// Rota para deletar um pet pelo id
router.delete("/pets/:id", isAuthenticated, async (req, res) => {
	const id = req.params.id;
	const petIndex = Pets.findIndex((p) => p.id === id);
	if (petIndex === -1) {
		return res.status(404).json({ message: "Pet não encontrado" });
	}

	const deletedPet = await Pets.splice(petIndex, 1);
	res.json(deletedPet[0]);
});

router.put(
	"/users/image",
	isAuthenticated,
	multer(uploadConfig).single("image"),
	async (req, res) => {
		try {
			const userId = req.userId;

			if (req.file) {
				const path = `./img/profile/${req.file.filename}`;

				// Atualiza a imagem no banco de dados
				await Image.changeUserImage(path, userId);

				res.json({ path }); // Retorna a URL da nova imagem para o frontend
				//res.json({ message: 'Imagem atualizada com sucesso.' });
			} else {
				throw new Error("Imagem não encontrada.");
			}
		} catch (error) {
			throw new HTTPError("Unable to update image", 400);
		}
	}
);

// Rota para adicionar uma curtida
router.post("/like", async (req, res) => {
	const { pet_id, usuario_id } = req.body;

	if (!pet_id || !usuario_id) {
		return res
			.status(400)
			.json({ error: "Pet ID e Usuario ID são obrigatórios" });
	}

	try {
		const curtidaId = await curtida.create(pet_id, usuario_id);

		return res.status(201).json({ id_curtida: curtidaId });
	} catch (error) {
		console.error("Erro ao adicionar curtida:", error);
		return res.status(500).json({ error: "Erro interno do servidor" });
	}
});

// Rota para atualizar informações de um usuário existente pelo ID
router.put("/users/:id", isAuthenticated, async (req, res) => {
	try {
		const user = req.body;
		const { id } = req.params;

		delete user.password;

		const updatedUser = await User.update({ ...user, id });

		delete updatedUser.password;

		return res.json(updatedUser);
	} catch (error) {
		console.error("Erro ao atualizar usuário:", error);
		throw new HTTPError("Unable to update user", 400);
	}
});

// 404 handler
router.use((req, res, next) => {
	res.status(404).json({ message: "Content not found!" });
});

// Error handler
router.use((err, req, res, next) => {
	console.error(err.stack);
	if (err instanceof HTTPError) {
		res.status(err.code).json({ message: err.message });
	} else {
		res.status(500).json({ message: "Something broke!" });
	}
});

export default router;
