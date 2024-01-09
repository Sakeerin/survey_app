import {createRouter,createWebHistory} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Regiter from '../views/Register.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
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
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;