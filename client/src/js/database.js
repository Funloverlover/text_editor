import { openDB } from 'idb';

(async () => {
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
})();

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (value) => {
  const jateDb = await openDB('jate', 1);
  const result = await jateDb.transaction('jate', 'readwrite').objectStore('jate').put({ id: 1, value });
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = () => {
  return new Promise(async (res, rej) => {
    const jateDb = await openDB('jate', 1);
    const result = await jateDb.transaction('jate', 'readonly').objectStore('jate').get(1);
    res(result?.value);
  });
};
