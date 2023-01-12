import httpClient from '../axios';

const SAVE = '/order/save';
const sendOrder = async (DATOS) => httpClient.getAPI(SAVE, { data: DATOS });

export default sendOrder;
