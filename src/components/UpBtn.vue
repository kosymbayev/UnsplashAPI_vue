<template>
    <div class="up_btn_block">
        <button 
        v-if="isUpButton" 
        class="up_btn"
        @click="scrollToTop"
        >
        </button>
    </div>
</template>

<script>
export default {
    name: 'UpBtn',
    data() {
        return {
            isUpButton: false,
        };
    },
    mounted()
    {
        window.addEventListener('scroll', this.handlePageScroll);
    },
    beforeDestroy()
    {
        window.removeEventListener('scroll', this.handlePageScroll);
    },
    methods: 
    {
        handlePageScroll()
        {
            const screenHeight = window.innerHeight;
            const scrollPosition = window.scrollY;
            this.isUpButton = scrollPosition > screenHeight / 2;
        },
        scrollToTop()
        {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style>
.up_btn_block
{
    position: fixed;
    right: 3vw;
    bottom: 70px;
}
.up_btn
{
    width: 48px;
    height: 48px;
    background-color: #fff;
    background-image: url('/src/assets/up.svg');
    background-size: 23px;
    background-repeat: no-repeat;
    background-position: center;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}
@media screen and (min-width: 1024px) 
{
    .up_btn
    {
        opacity: 0.6;
        transition: opacity .3s ease;
    }
    .up_btn:hover
    {
        opacity: 1;
    }
}
</style>