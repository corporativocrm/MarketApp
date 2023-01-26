import Dexie from 'dexie';

const DB = new Dexie('clientMaferca');

DB.version(1).stores({
  session: '++guid, name, dni, client_id, seller, address, color, org, versionCurrent, timewake',
});

async function resetDB() {
  return DB.delete().then(() => DB.open());
}

async function saveSessionInDB(data) {
  try {
    await DB.session.clear();
    return await DB.session.add(data);
  } catch (error) {
    console.error(error);
  }
  return false;
}

export {
  DB,
  resetDB,
  saveSessionInDB,
};
