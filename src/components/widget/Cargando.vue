<template functional>
    <transition name="fade">
    <div class="preloader">
        <img src="system/animate_update.webp">
    </div>
    </transition>
</template>

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
        height: 10;
        background-repeat: no-repeat;
    }

</style>
