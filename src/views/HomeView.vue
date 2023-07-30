<template>
    <div>

        <!-- Поиск -->
        <div class="search_block">
            <div class="search_input_wrapper">
                <input 
                    v-model="searchTerm" 
                    @input="onSearch(searchTerm)"
                    class="search_input"
                    placeholder="Поиск"
                >
            </div>
        </div>
        
        <!-- Рандомные картинки и Картинки по запросу -->
        <ImagesGrid :images="areRandomImages ? randomImages : searchedImages" />
        
    </div>
</template>

<script>
import env from '../env';
import axios from 'axios';

import ImagesGrid from '../components/ImagesGrid.vue';

export default {
    name: 'HomeView',
    components: 
    {
        ImagesGrid
    },
    data() {
        return {
            randomImages: [],
            searchedImages: [],
            searchTerm: '',
            areRandomImages: true,
        };
    },
    created()
    {
        this.fetchRandomImages();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy()
    {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: 
    {
        async fetchRandomImages()// Рандомные картинки
        {
            try 
            {
                const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${env.apikey}`, {
                    params: { count: 9 },
                    headers: { Authorization: env.apikey },
                });
                this.randomImages = response.data;
                //console.log(response)
            }
            catch (error)
            {
                console.log('Ошибка при получении рандомных картинок', error);
            }
        },
        async fetchSearchImages(keyword, page)// Вывод картинок поиска
        {
            try 
            {
                const response = await axios.get(`https://api.unsplash.com/search/photos?client_id=${env.apikey}`, {
                    params: { query: keyword, page: page, per_page: 9 },
                    headers: { Authorization: env.apikey },
                });
                return response.data.results;
            }
            catch (error)
            {
                console.log('Ошибка при получении картинок по запросу', error);
                return [];
            }
        },
        async onSearch(keyword)// Поиск
        {
            if(keyword)
            {
                this.searchPage = 1;
                const searchedImages = await this.fetchSearchImages(this.searchTerm, this.searchPage);
                this.searchedImages= searchedImages;
                this.areRandomImages = false;
            }
            else
            {
                this.areRandomImages = true;
            }
        },
        handleScroll()// Если в конце страницы
        {
            if (this.loading) return;
            if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 )
            {
                this.loadMoreImages();
            }
        },
        async loadMoreImages()// Загрузка доп.картинок
        {
            this.loading = true;
            try
            {
                if(this.areRandomImages)
                {
                    const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${env.apikey}`, {
                        params: { count: 9 },
                        headers: { Authorization: env.apikey },
                    });
                    this.randomImages = this.randomImages.concat(response.data)
                }
                else
                {
                    this.searchPage++;
                    const searchedImages = await this.fetchSearchImages(this.searchTerm, this.searchPage);
                    this.searchedImages = this.searchedImages.concat(searchedImages);
                }
            }
            catch (error)
            {
                console.log('Ошибка загрузки новых картинок', error)
            }
            this.loading = false;
        }
    }
}
</script>

<style>
</style>