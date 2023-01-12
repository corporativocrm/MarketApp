import httpClient from '../axios';

const CLIENTES = '/download/clients';
const PRODUCTOS = '/download/products';
const CONDICIONES = '/download/paymentmethods';
const UPDATE = '/download/getdata';

const getClientes = async (USUARIO) => httpClient.getAPI(CLIENTES, { user: USUARIO });

const getProductos = async (USUARIO) => httpClient.getAPI(PRODUCTOS, { user: USUARIO });

const getImageProducts = async (items) => httpClient.getAPI('/download/imgproduct', { data: items });

const getCondicionesPago = async (USUARIO) => httpClient.getAPI(CONDICIONES, { user: USUARIO });

const getData = async (USUARIO) => httpClient.getAPI(UPDATE, { user: USUARIO });

export {
  getClientes,
  getProductos,
  getImageProducts,
  getCondicionesPago,
  getData,
};
