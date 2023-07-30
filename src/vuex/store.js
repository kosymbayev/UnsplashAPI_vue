import { createStore } from 'vuex';


const state = {
  images: [],       // Массив всех картинок
  favorites: [],    // Массив избранных картинок (хранит идентификаторы картинок)
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  addToFavorites(state, imageId) {
    if (!state.favorites.includes(imageId)) {
      state.favorites.push(imageId);
    }
  },
  removeFromFavorites(state, imageId) {
    state.favorites = state.favorites.filter((id) => id !== imageId);
  },
};

const actions = {
  // Здесь вы можете определить действия для загрузки картинок и других операций
};

const getters = {
  getFavoriteImages(state) {
    // Возвращаем список избранных картинок на основе идентификаторов
    return state.images.filter((image) => state.favorites.includes(image.id));
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;