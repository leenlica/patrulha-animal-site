/*
  Warnings:

  - Made the column `usuario_id` on table `Curtida` required. This step will fail if there are existing NULL values in that column.

*/
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
