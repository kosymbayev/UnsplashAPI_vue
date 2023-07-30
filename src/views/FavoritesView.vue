<template>
    <section class="favorite_page">

        <h1 class="favorite_title">Избранное</h1>
        <div v-if="favoriteImages.length == 0" style="text-align: center;">У вас нет избранных</div>
        <ImagesGrid v-else :images="favoriteImages" />
            
    </section>
</template>

<script>
import env from '../env';
import axios from 'axios';

import ImagesGrid from '../components/ImagesGrid.vue';

export default {
    name: 'FavoritesView',
    components: 
    {
        ImagesGrid
    },
    data() {
        return {
            favoriteImages: [],
        };
    },
    created()
    {
        this.getFavoriteImages();
    },
    methods: 
    {
        async getFavoriteImages()
        {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const requests = favorites.map(async (imageId) => {
                try
                {
                    const response = await axios.get(`https://api.unsplash.com/photos/${imageId}?client_id=${env.apikey}`);
                    return response.data;
                }
                catch (error)
                {
                    console.log(`Ошибка при получении информации о картинке ${imageId}`, error);
                    return null;
                }
            });
            try
            {
                const favoriteImagesData = await Promise.all(requests);
                this.favoriteImages = favoriteImagesData.filter(image => image !== null);
            }
            catch (error)
            {
                console.log('Ошибка при получении информации о избранных картинках', error);
            }
        },
    }
}
</script>

<style>
</style>