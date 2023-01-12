<template>
    <transition name="fade">
    <div v-show="show" class="preloader">
        <img src="system/animate_loading.webp" alt="">
    </div>
    </transition>
</template>

<script>
export default {
  name: 'preloader',
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.$store.dispatch('WebServices/setPreload', true);
    this.showToggle();
  },
  methods: {
    showToggle() {
      setTimeout(() => {
        this.show = false;
        this.$store.dispatch('WebServices/setPreload', false);
      }, 4000);
    },
  },
};
</script>

<style>
    .preloader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: white;
        /*se convierte en la caja padre*/
        z-index: 9999;
    }

    img {
        width: 100%;
        height: auto;
        background-repeat: no-repeat;
    }

</style>
