import httpClient from '../axios';

const getAllMessages = async () => httpClient.getAPI('notify/all', null);
const getConversation = async (param) => httpClient.getAPI('notify/get/'.concat(param), null);
const sendAnswer = async (param) => httpClient.getAPI('notify/send', param);

export { getAllMessages, getConversation, sendAnswer };
