/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "usuario_endereco_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "user_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco" ("id_endereco") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curtida" (
    "id_curtida" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "data_curtida" DATETIME,
    CONSTRAINT "Curtida_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curtida_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "user" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curtida" ("data_curtida", "id_curtida", "pet_id", "usuario_id") SELECT "data_curtida", "id_curtida", "pet_id", "usuario_id" FROM "Curtida";
DROP TABLE "Curtida";
ALTER TABLE "new_Curtida" RENAME TO "Curtida";
CREATE UNIQUE INDEX "Curtida_usuario_id_key" ON "Curtida"("usuario_id");
CREATE UNIQUE INDEX "Curtida_pet_id_key" ON "Curtida"("pet_id");
CREATE TABLE "new_adocao" (
    "id_ado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "pet_id" INTEGER NOT NULL,
    CONSTRAINT "adocao_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adocao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "user" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_adocao" ("id_ado", "pet_id", "usuario_id") SELECT "id_ado", "pet_id", "usuario_id" FROM "adocao";
DROP TABLE "adocao";
ALTER TABLE "new_adocao" RENAME TO "adocao";
CREATE UNIQUE INDEX "adocao_usuario_id_key" ON "adocao"("usuario_id");
CREATE UNIQUE INDEX "adocao_pet_id_key" ON "adocao"("pet_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "user_endereco_id_key" ON "user"("endereco_id");
