import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import LoginForm from './components/LoginForm.vue';
import HeaderComponent from './components/HeaderComponent';
import SignupForm from './components/SignupForm.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: LoginForm},
        { path: '/signup', component: SignupForm}
    ]
});

const app = createApp(App);

app.mount('#app');

app.use(router);

app.component('header-component', HeaderComponent);
