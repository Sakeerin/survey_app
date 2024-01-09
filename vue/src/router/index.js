import {createRouter,createWebHistory} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Surveys from '../views/Surveys.vue';
import Login from '../views/Login.vue';
import Regiter from '../views/Register.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import store from '../store';
import { nextTick } from 'vue';

const routes = [
    {
        path: '/',
        reditect: '/dashboard',
        component: DefaultLayout,
        meta: {requiresAuth: true},
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/surveys', name: 'Surveys', component: Surveys}
        ]
    },
    {
        path: '/auth',
        reditect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Regiter',
                component: Regiter
            },
        ]
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    }else if(store.state.user.token && (to.meta.isGuest)){
        next({name: 'Dashboard'});
    }else{
        next();
    }
})

export default router;