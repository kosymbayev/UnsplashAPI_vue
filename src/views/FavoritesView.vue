<template>
    <section class="favorite_page">

        <h1 class="favorite_title">Избранное</h1>
        <div v-if="favoriteImages.length == 0" style="text-align: center;">У вас нет избранных</div>
        <div v-else class="images_grid">
            <div class="container">
                <router-link 
                    v-for="image in favoriteImages" 
                    :key="image.id" class="image" 
                    :to="`/image/${image.id}`"
                    :style="{ backgroundImage: `url(${image.urls?.small || ''})` }"
                >
                </router-link>
            </div>
        </div>
            
    </section>
</template>

<script>
import env from '../env';
import axios from 'axios';

export default {
    name: 'FavoritesView',
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