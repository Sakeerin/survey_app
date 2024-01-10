import {createStore} from 'vuex';
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {},
    actions: {
        register({ commit }, user){
            return axiosClient.post('/register', user)
            .then(({data}) => {
                commit('setUser', data);
                // commit('setToken', data.token)
                return data;
            })
            // return fetch(`http://localhost:8000/api/register`,{
            //     headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json",
            //     },
            //     method: "POST",
            //     body: JSON.stringify(user),
            // })
            // .then((res) => res.json())
            // .then((res) => {
            //     commit('setUser', res);
            //     return res;
            // });
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
            .then(({data}) => {
                commit('setUser', data);
                // commit('setToken', data.token)
                return data;
            })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
        },
    },
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        // setToken: (state, token) => {
        //     state.user.token = token;
        //     sessionStorage.setItem('TOKEN', token);
        // },
    },
    modules: {},
})

export default store;