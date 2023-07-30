<template>
    <div v-if="image" class="image_page">
        <div class="image_back" :style="{ backgroundImage: `url(${image.urls.regular})` }"></div>
        <div class="container">
            <div class="image_info">
                <div class="image_author">
                    <div class="author_img" :style="{ backgroundImage: `url(${image.user.profile_image.small})` }"></div>
                    <div class="author_info">
                        <h2 class="author_name">{{ image.user.name }}</h2>
                        <span class="author_nick">@{{ image.user.username }}</span>
                    </div>
                </div>
                <div class="image_buttons">
                    <button 
                        @click="toggleFavorite" 
                        class="favorite_btn" 
                        :class="{ 'favorite_btn__active': isFavorite }"
                    >
                    </button>
                    <a 
                        :href="image.links.download" 
                        class="download_btn"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        download
                    >
                        <span>Download</span>
                    </a>
                </div>
            </div>
            
            <img class="image_detail" :src="image.urls.regular" :alt="image.description || 'Image'">
        </div>

    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script>
import env from '../env';
import axios from 'axios';

export default {
    name: 'ImageDetailView',
    data() {
        return {
            image: null,
            isFavorite: false,
        };
    },
    created()
    {
        this.fetchImageDetail();
    },
    methods: 
    {
        async fetchImageDetail()// Достаю картинку
        {
            try 
            {
                const imageId = this.$route.params.id;
                const response = await axios.get(`https://api.unsplash.com/photos/${imageId}?client_id=${env.apikey}`);
                this.image = response.data;
                this.checkFavoriteStatus();
            }
            catch (error)
            {
                console.log('Ошибка при получении информации о картинке', error);
            }
        },
        checkFavoriteStatus()
        {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            this.isFavorite = favorites.some(imageId => imageId === this.image.id);
        },
        toggleFavorite()
        {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const imageId = this.image.id;

            if( favorites.includes(imageId) )// Удаляю из избранных
            {
                const updatedFavorites = favorites.filter(id => id !== imageId);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                this.isFavorite = false;
            }
            else// Добавляю в избранное
            {
                favorites.push(imageId);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                this.isFavorite = true;
            }
        }
    }

}
</script>