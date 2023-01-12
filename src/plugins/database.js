import Dexie from 'dexie';

const DB = new Dexie('clientMaferca');

DB.version(1).stores({
  session: '++guid,color,multibasket,name,org,organization,rol,timewake,userid,versionCurrent',
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
