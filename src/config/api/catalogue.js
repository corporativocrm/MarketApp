import httpClient from '../axios';

const getIndex = async (param) => httpClient.getAPI('market/get/index', param);
const getProducts = async (param) => httpClient.getAPI('market/get/products', param);
const sendOrder = async (param) => httpClient.getAPI('market/order/add', { data: param });
const getOrder = async () => httpClient.getAPI('market/order/list', {});
const getFavorite = async () => httpClient.getAPI('market/get/product/favorite', {});
const toggleFavorite = async (param) => httpClient.getAPI('market/set/product/favorite', { data: param });
const getTop20 = async () => httpClient.getAPI('market/get/top', {});

export {
  getIndex,
  getProducts,
  getOrder,
  sendOrder,
  getFavorite,
  toggleFavorite,
  getTop20,
};
