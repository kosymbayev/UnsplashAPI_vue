<template>
  <div id="app">

    <TheHeader />
    
    <router-view></router-view>

    <UpBtn />

  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import UpBtn from './components/UpBtn.vue';

export default {
  name: 'App',
  components: 
  {
    TheHeader,
    UpBtn
  },
};
</script>

<style>
</style>
