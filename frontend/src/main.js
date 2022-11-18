import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import LoginForm from './components/LoginForm.vue';
import HeaderComponent from './components/HeaderComponent';
import SignupForm from './components/SignupForm.vue';
import CreatePost from './components/posts/CreatePost.vue';
import DisplayPosts from './components/posts/DisplayPosts.vue';
import DisplayOnePost from './components/posts/DisplayOnePost.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login'},
        { path: '/login', component: LoginForm},
        { path: '/signup', component: SignupForm},
        { path: '/createPost', component: CreatePost},
        { path: '/viewPosts', component: DisplayPosts},
        { path: '/viewPost/:postid', component: DisplayOnePost, props: true},
        { path: '/:notfound(.*)', redirect: '/login'}
    ]
});

const app = createApp(App);

app.use(router);

app.mount('#app');

app.component('header-component', HeaderComponent);
