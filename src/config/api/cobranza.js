import httpClient from '../axios';

const URL_API = 'https://www.sistemacrm.com.ve/backend/public/api/';

const URL_DOCUMENTS = 'cobranza/documents';
const getCobranza = (data) => httpClient.httpClient.post(URL_DOCUMENTS, data, { baseURL: URL_API });

const URL_CLIENTS = 'cobranza/clients';
const getClients = (data) => httpClient.httpClient.post(URL_CLIENTS, data, { baseURL: URL_API });

const URL_BANKS = 'cobranza/banks';
const getBanks = (data) => httpClient.httpClient.post(URL_BANKS, data, { baseURL: URL_API });

const URL_SEND = 'cobranza/add';
const addCobranza = (data) => httpClient.httpClient.post(URL_SEND, data, { baseURL: URL_API });

export {
  getCobranza,
  getClients,
  getBanks,
  addCobranza,
};
