-- CreateTable
CREATE TABLE "Img" (
    "id_img" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "user_id" INTEGER,
    "pet_id" INTEGER,
    CONSTRAINT "Img_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Img_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Img_user_id_key" ON "Img"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Img_pet_id_key" ON "Img"("pet_id");
