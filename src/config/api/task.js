import httpClient from '../axios';

const getTasks = async (param) => httpClient.getAPI('task/all', param);
const saveTask = async (param) => httpClient.getAPI('task/save', param);

export { getTasks, saveTask };
