import {createStore} from 'vuex';
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        dashboard: {
          loading: false,
          data: {},
        },
        currentSurvey: {
            loading: false,
            data: {}
        },
        surveys: {
            loading: false,
            links: [],
            data: []
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
          show: false,
          type: null,
          message: null,
        }
    },
    getters: {},
    actions: {
        getDashboardData({commit}) {
          commit('dashboardLoading', true)
          return axiosClient.get(`/dashboard`)
          .then((res) => {
            commit('dashboardLoading', false)
            commit('setDashboardData', res.data)
            return res;
          })
          .catch(error => {
            commit('dashboardLoading', false)
            return error;
          })
    
        },
        getSurvey({ commit }, id) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient
              .get(`/survey/${id}`)
              .then((res) => {
                commit("setCurrentSurvey", res.data);
                commit("setCurrentSurveyLoading", false);
                return res;
              })
              .catch((err) => {
                commit("setCurrentSurveyLoading", false);
                throw err;
              });
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url;
      
            let response;
            if (survey.id) {
              response = axiosClient
                .put(`/survey/${survey.id}`, survey)
                .then((res) => {
                  commit('setCurrentSurvey', res.data)
                    // commit('updateSurvey', res.data)
                    return res;
                });
            } else {
              response = axiosClient.post("/survey", survey).then((res) => {
                commit('setCurrentSurvey', res.data)
                // commit('saveSurvey', res.data)
                return res;
              });
            }
      
            return response;
        },
        deleteSurvey({ dispatch }, id) {
            return axiosClient.delete(`/survey/${id}`).then((res) => {
              dispatch('getSurveys')
              return res;
            });
        },
        getSurveys({ commit }, {url = null} = {}) {
            commit('setSurveysLoading', true)
            url = url || "/survey";
            return axiosClient.get(url).then((res) => {
              commit('setSurveysLoading', false)
              commit("setSurveys", res.data);
              return res;
            });
        },
        getSurveyBySlug({ commit }, slug) {
          commit("setCurrentSurveyLoading", true);
          return axiosClient
            .get(`/survey-by-slug/${slug}`)
            .then((res) => {
              commit("setCurrentSurvey", res.data);
              commit("setCurrentSurveyLoading", false);
              return res;
            })
            .catch((err) => {
              commit("setCurrentSurveyLoading", false);
              throw err;
            });
        },
        saveSurveyAnswer({commit}, {surveyId, answers}) {
          return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
        },
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
        dashboardLoading: (state, loading) => {
          state.dashboard.loading = loading;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
          state.currentSurvey.data = survey.data;
        },
        setSurveys: (state, surveys) => {
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
        },
        // saveSurvey: (state, survey) => {
        //     state.surveys = [...state.surveys, survey.data];
        // },
        // updateSurvey: (state, survey) => {
        //     state.surveys = state.surveys.map((s) => {
        //         if(s.id == survey.data.id) {
        //             return survey.data;
        //         }
        //         return s;
        //     });
        // },
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
        notify: (state, {message, type}) => {
          state.notification.show = true;
          state.notification.type = type;
          state.notification.message = message;
          setTimeout(() => {
            state.notification.show = false;
          }, 3000)
        },
    },
    modules: {},
})

export default store;