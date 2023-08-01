import { createStore } from 'vuex';

const store = createStore({
    state: 
    {
        favorites: []
    },
    mutations:
    {
        ADD_TO_FAVORITE(state, imageId) 
        {
            state.favorites.push(imageId);
            console.log('ADD_TO_FAVORITE' + state.favorites)
        },
        REMOVE_FROM_FAVORITE(state, imageId) 
        {
            state.favorites = state.favorites.filter((id) => id !== imageId);
            console.log('REMOVE_FROM_FAVORITE' + state.favorites)
        },
    },
    actions:
    {
        ADD_TO_FAVORITE({commit}, imageId) 
        {
            commit('ADD_TO_FAVORITE', imageId)
        },
        REMOVE_FROM_FAVORITE({commit}, imageId) 
        {
            commit('REMOVE_FROM_FAVORITE', imageId)
        },
    },
    getters:
    {
        FAVORITES(state) 
        {
            return state.favorites
        }
    }
});

export default store;