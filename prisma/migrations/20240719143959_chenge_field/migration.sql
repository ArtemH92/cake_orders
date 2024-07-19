-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dessert" TEXT NOT NULL,
    "cakeType" TEXT,
    "cupcakesType" TEXT,
    "filling" TEXT,
    "quantity" DECIMAL,
    "photo" INTEGER,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "lastEditedById" TEXT,
    CONSTRAINT "Order_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_lastEditedById_fkey" FOREIGN KEY ("lastEditedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("cakeType", "createdAt", "createdById", "cupcakesType", "date", "dessert", "filling", "id", "lastEditedById", "notes", "photo", "quantity", "time", "updatedAt") SELECT "cakeType", "createdAt", "createdById", "cupcakesType", "date", "dessert", "filling", "id", "lastEditedById", "notes", "photo", "quantity", "time", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
