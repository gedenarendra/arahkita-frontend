import Dexie from "dexie";

export const db = new Dexie("ArahKitaDB");

// Deklarasi skema tabel IndexedDB
// Contoh format penambahan tabel di masa mendatang:
// db.version(1).stores({
//   userProfile: '++id, name, grade',
//   testResults: '++id, testId, completedAt',
// });
db.version(1).stores({
  majorNodes: 'id, major_name, circle_color, child_id',
});

export default db;
