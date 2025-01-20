/*
  Warnings:

  - You are about to drop the column `cpf_doa` on the `usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefone_um" TEXT,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "usuario_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco" ("id_endereco") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_usuario" ("email", "endereco_id", "id_usuario", "nome", "password", "telefone_um") SELECT "email", "endereco_id", "id_usuario", "nome", "password", "telefone_um" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_endereco_id_key" ON "usuario"("endereco_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
