<template>
    <div>
      <!-- Search Input -->
      <div class="search_block">
        <div class="search_input_wrapper">
          <input
            v-model="searchTerm"
            @input="onSearch(searchTerm)"
            class="search_input"
            placeholder="Поиск"
          />
        </div>
      </div>
  
      <!-- Random or Searched Images -->
      <section v-if="areRandomImages" class="images_grid">
        <div class="container">
          <router-link
            v-for="image in randomImages"
            :key="image.id"
            :to="`/image/${image.id}`"
            class="image"
            :style="{ backgroundImage: `url(${image.urls?.small || ''})` }"
            :alt="image.description || 'Random Image'"
          ></router-link>
        </div>
      </section>
  
      <section v-else class="images_grid">
        <div class="container">
          <router-link
            v-for="image in searchedImages"
            :key="image.id"
            :to="`/image/${image.id}`"
            class="image"
            :style="{ backgroundImage: `url(${image.urls?.small || ''})` }"
            :alt="image.description || 'Searched Image'"
          ></router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import env from '../env';
  import axios from 'axios';
  import TheHeader from '../components/TheHeader.vue';
  
  export default {
    name: 'HomeView',
    components: {
      TheHeader,
    },
    data() {
      return {
        randomImages: [],
        searchedImages: [],
        searchTerm: '',
        areRandomImages: true,
        loading: false,
        searchPage: 1,
      };
    },
    created() {
      this.fetchRandomImages();
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      async fetchRandomImages() {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/photos/random?client_id=${env.apikey}`,
            {
              params: { count: 9 },
              headers: { Authorization: env.apikey },
            }
          );
          this.randomImages = response.data;
        } catch (error) {
          console.log('Error fetching random images', error);
        }
      },
      async fetchSearchImages(keyword, page) {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?client_id=${env.apikey}`,
            {
              params: { query: keyword, page: page, per_page: 9 },
              headers: { Authorization: env.apikey },
            }
          );
          return response.data.results;
        } catch (error) {
          console.log('Error fetching searched images', error);
          return [];
        }
      },
      async onSearch(keyword) {
        if (keyword) {
          this.searchPage = 1;
          const searchedImages = await this.fetchSearchImages(this.searchTerm, this.searchPage);
          this.searchedImages = searchedImages;
          this.areRandomImages = false;
        } else {
          this.areRandomImages = true;
        }
      },
      handleScroll() {
        if (this.loading) return;
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100
        ) {
          this.loadMoreImages();
        }
      },
      async loadMoreImages() {
        this.loading = true;
        try {
          if (this.areRandomImages) {
            const response = await axios.get(
              `https://api.unsplash.com/photos/random?client_id=${env.apikey}`,
              {
                params: { count: 9 },
                headers: { Authorization: env.apikey },
              }
            );
            this.randomImages = this.randomImages.concat(response.data);
          } else {
            this.searchPage++;
            const searchedImages = await this.fetchSearchImages(this.searchTerm, this.searchPage);
            this.searchedImages = this.searchedImages.concat(searchedImages);
          }
        } catch (error) {
          console.log('Error loading more images', error);
        }
        this.loading = false;
      },
    },
  };
  </script>
  
  <style>
  /* Your existing styles or add any additional styles here */
  </style>
  