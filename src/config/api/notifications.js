import httpClient from '../axios';

const getNotifications = async (param) => httpClient.getAPI('notify/all', param);
const sendAnswer = async (param) => httpClient.getAPI('notify/send', param);

export { getNotifications, sendAnswer };
