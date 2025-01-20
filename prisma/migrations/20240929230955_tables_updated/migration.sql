-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "endereco_id" INTEGER,
    CONSTRAINT "user_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco" ("id_endereco") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("cpf", "email", "endereco_id", "id_usuario", "nome", "password") SELECT "cpf", "email", "endereco_id", "id_usuario", "nome", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_endereco_id_key" ON "user"("endereco_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
