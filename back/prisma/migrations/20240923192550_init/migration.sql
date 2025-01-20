-- CreateTable
CREATE TABLE "endereco" (
    "id_endereco" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagem" BLOB,
    "name" TEXT,
    "age" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "species" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Curtida" (
    "id_curtida" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "data_curtida" DATETIME NOT NULL,
    CONSTRAINT "Curtida_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curtida_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf_doa" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefone_um" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "usuario_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco" ("id_endereco") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "adocao" (
    "id_ado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "pet_id" INTEGER NOT NULL,
    CONSTRAINT "adocao_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adocao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Curtida_usuario_id_key" ON "Curtida"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Curtida_pet_id_key" ON "Curtida"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_endereco_id_key" ON "usuario"("endereco_id");

-- CreateIndex
CREATE UNIQUE INDEX "adocao_usuario_id_key" ON "adocao"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "adocao_pet_id_key" ON "adocao"("pet_id");
