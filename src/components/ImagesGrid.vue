<template>
    <section class="images_grid">
        <div class="container">
            <router-link 
                v-for="image in images" 
                :key="image.id" 
                :to="`/image/${image.id}`"
                class="image"
                :style="{ backgroundImage: `url(${image.urls?.small || ''})` }"
                :alt="image.description || 'Random Image'"
            >
            </router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ImagesGrid',
    props: 
    {
        images: 
        {
            type: Array,
            default: () => []
        }
    }
}
</script>