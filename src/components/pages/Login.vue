<template>
  <v-container>
    <div class="screen">
      <div class="screen__content">
        <h1 style="color: #3d4959;">Sistema CRM</h1>
        <h3 style="color: #677a93;">Bienvenido</h3>
        <form class="login" onSubmit="return false;">
            <v-text-field
              label="Usuario"
              v-model="username"
              prepend-icon="mdi-account"
              type="text"
              color="#0071e1"
              style="width:85%;"
            ></v-text-field>
            <v-text-field
              @keyup.enter="validateForm()"
              label="Clave"
              v-model="password"
              prepend-icon="mdi-asterisk"
              :append-icon="passNoView ? 'visibility' : 'visibility_off'"
              @click:append="() => (passNoView = !passNoView)"
              :type="passNoView ? 'password' : 'text'"
              color="#0071e1"
              style="width:85%;"
            ></v-text-field>
        </form>
        <v-btn class="login__submit" @click="validateForm()">
          <span class="button__text">INGRESAR</span>
          <v-icon large aria-hidden="false" class="button__icon">
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/extensions
import httpClient from '../../config/axios';
import versionCurrent from '../../plugins/version';
import { saveSessionInDB } from '../../plugins/database';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      passNoView: true,
      form: false,
    };
  },
  computed: {
  },
  methods: {
    async validateForm() {
      if (this.username.trim() === '') {
        this.alert('Debe ingresar su usuario de acceso', 'info');
      } else if (this.password === '') {
        this.alert('Debe ingresar su clave de acceso', 'info');
      } else {
        await this.getUsuario();
      }
    },

    async getUsuario() {
      try {
        if (navigator.onLine) {
          await httpClient.getAPI('/market/auth/login', {
            user: this.username,
            password: btoa(this.password),
            company: '5022',
          }).then((response) => {
            if (response.data.response !== null && response.data.response !== false) {
              const dataUser = response.data.response;
              const dataProfile = {
                name: dataUser.name,
                dni: dataUser.dni,
                client_id: dataUser.client_id,
                seller: dataUser.seller,
                address: dataUser.address,
                color: dataUser.color,
                org: dataUser.company,
                zone: dataUser.zone,
                versionCurrent: versionCurrent(),
                timewake: (new Date()).getTime(),
              };

              this.$store.dispatch('StoreProfile/setProfile', dataProfile);
              this.$store.dispatch('StoreProfile/setLogin', true);

              saveSessionInDB(dataProfile);
              window.location.reload(true);
            } else {
              this.alert('El usuario/clave es incorrecto', 'warning');
            }
          });
        } else {
          this.alert('Sin conexión a Internet', 'warning');
        }
      } catch (error) {
        this.alert(error, 'error');
      }
    },
    alert(msj, type = 'info') {
      this.$store.dispatch('mensaje/push', [msj, type]);
    },
  },
};
</script>

<style>
  .screen {
    background: linear-gradient(90deg, #2674d2, #5995d7);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    box-shadow: 0px 0px 24px #327dda;
  }

  .screen__content {
    z-index: 1;
    position: relative;
    height: 100%;
    padding: 4rem 0 0 1rem;
  }

  .screen__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    -webkit-clip-path: inset(0 0 0 0);
    clip-path: inset(0 0 0 0);
  }

  .screen__background__shape {
    transform: rotate(45deg);
    position: absolute;
  }

  .screen__background__shape1 {
    height: 520px;
    width: 520px;
    background: #FFF;
    top: -50px;
    right: 120px;
    border-radius: 0 72px 0 0;
  }

  .screen__background__shape2 {
    height: 220px;
    width: 220px;
    background: #327dda;
    top: -172px;
    right: 0;
    border-radius: 32px;
  }

  .screen__background__shape3 {
    height: 540px;
    width: 190px;
    background: linear-gradient(270deg, #2674d2, #5995d7);
    top: -24px;
    right: 0;
    border-radius: 32px;
  }

  .screen__background__shape4 {
    height: 400px;
    width: 200px;
    background: #327dda;
    top: 420px;
    right: 50px;
    border-radius: 60px;
  }

  .login {
    width: 320px;
    padding: 30px;
    padding-top: 3rem;
  }

  .login__submit {
    background: #fff;
    font-size: 16px;
    margin: 30px 0 0 1rem;
    padding: 10px 20px;
    border-radius: 26px;
    border: 1px solid #D4D3E8;
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    width: 70%;
    height: 3rem !important;
    color: #2674d2;
    box-shadow: 0px 2px 2px #327dda;
    cursor: pointer;
    transition: .2s;
  }

  .login__submit:active,
  .login__submit:focus,
  .login__submit:hover {
    border-color: #327dda;
    outline: none;
  }

  .button__icon {
    margin-left: auto;
    color: #327dda;
  }
</style>
