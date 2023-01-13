import httpClient from '../axios';

const getIndex = async (param) => httpClient.getAPI('ecommerce/get/index', param);
const getProducts = async (param) => httpClient.getAPI('ecommerce/get/products', param);

export { getIndex, getProducts };
