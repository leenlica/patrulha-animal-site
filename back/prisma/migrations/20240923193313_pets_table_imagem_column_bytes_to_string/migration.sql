-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagem" TEXT,
    "name" TEXT,
    "age" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "species" TEXT NOT NULL
);
INSERT INTO "new_Pets" ("age", "description", "id", "imagem", "name", "species") SELECT "age", "description", "id", "imagem", "name", "species" FROM "Pets";
DROP TABLE "Pets";
ALTER TABLE "new_Pets" RENAME TO "Pets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
