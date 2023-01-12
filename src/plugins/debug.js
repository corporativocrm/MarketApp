// eslint-disable-next-line import/extensions
import versionCurrent from './version';
// eslint-disable-next-line import/extensions
import storeDebug from '../config/api/debug';

const logDebug = (error) => {
  let data = localStorage.getItem('debug-log');

  if (data !== null) {
    data = JSON.parse(data);
    data.push(error);
  } else {
    data = [error];
  }

  localStorage.setItem('debug-log', JSON.stringify(data));
};

async function sendDebug() {
  const profile = JSON.parse(localStorage.getItem('session-local'));

  if (profile !== null) {
    const data = JSON.parse(localStorage.getItem('debug-log'));
    const requests = {
      org: profile.org || '',
      society_id: profile.organization[0].society || '',
      user_id: profile.userid || '',
      user_rol: profile.rol || '',
      log: JSON.stringify(data),
      origin: 'app',
      version: versionCurrent(),
    };

    await storeDebug(requests).then(() => {
      localStorage.removeItem('debug-log');
    });
  }
}

export { logDebug, sendDebug };
