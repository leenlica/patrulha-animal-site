-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagem" TEXT,
    "name" TEXT,
    "age" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "user_id" INTEGER,
    CONSTRAINT "Pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pets" ("age", "description", "id", "imagem", "name", "species") SELECT "age", "description", "id", "imagem", "name", "species" FROM "Pets";
DROP TABLE "Pets";
ALTER TABLE "new_Pets" RENAME TO "Pets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
