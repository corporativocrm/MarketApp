import httpClient from '../axios';

const getIndex = async (param) => httpClient.getAPI('market/get/index', param);
const getProducts = async (param) => httpClient.getAPI('market/get/products', param);
const sendOrder = async (param) => httpClient.getAPI('market/order/add', { data: param });
const getOrder = async () => httpClient.getAPI('market/order/list', {});

export {
  getIndex,
  getProducts,
  getOrder,
  sendOrder,
};
