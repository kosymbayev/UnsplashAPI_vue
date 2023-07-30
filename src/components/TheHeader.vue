<template>
    <header class="header" :class="isHomePage ? 'header_home' : 'header_page'">
        <div class="container">
            <router-link to="/" class="logo">
                <img src="/src/assets/logo.svg" alt="">
            </router-link>
            <nav class="header_nav">
                <router-link to="/" v-if="!isHomePage" class="nav_item">
                    <img src="/src/assets/search.svg" alt="">
                    <span class="nav_title">Поиск</span>
                </router-link>
                <router-link to="/favorites" class="nav_item">
                    <img src="/src/assets/favorite.svg" alt="">
                    <span class="nav_title">Избранные</span>
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
  },
};
</script>