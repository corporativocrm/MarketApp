import axios from 'axios';
// eslint-disable-next-line import/extensions
import { DB } from '../plugins/database';

function DriverAxios() {
  this.httpClient = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  this.loadProfile = async () => {
    this.profile = await DB.session.get(1);
  };

  this.addHeadSession = (dataRaw) => {
    if (this.profile !== undefined) {
      return {
        ...{
          session: {
            dni: this.profile.dni,
            seller: this.profile.seller,
            organization: this.profile.org,
            route_current: 'app',
            origin: 'app',
            version: this.profile.versionCurrent,
            timewake: this.profile.timewake,
          },
        },
        ...dataRaw,
      };
    }

    return dataRaw;
  };

  this.getAPI = ((URL, data) => this.httpClient.get(URL, { params: this.addHeadSession(data) }));
  this.postAPI = ((URL, data) => this.httpClient.post(URL, { params: this.addHeadSession(data) }));
}

const httpClient = new DriverAxios();
httpClient.loadProfile();

export default httpClient;
