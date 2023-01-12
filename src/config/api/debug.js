import httpClient from '../axios';

const URL_API = 'https://www.sistemacrm.com.ve/backend/public/api/';

const URL_STORE = 'debug/log';
const storeDebug = (data) => httpClient.httpClient.post(URL_STORE, data, { baseURL: URL_API });

export default storeDebug;
