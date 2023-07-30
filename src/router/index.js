import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import ImageDetailView from '../views/ImageDetailView.vue';
import FavoritesView from '../views/FavoritesView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/image/:id',
            name: 'Image',
            component: ImageDetailView,
        },
        {
            path: '/favorites',
            name: 'Favorites',
            component: FavoritesView,
        },
    ]
})

export default router;
