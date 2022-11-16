import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');

import HeaderComponent from './components/HeaderComponent';
import LoginForm from './components/LoginForm'

app.component('header-component', HeaderComponent);
app.component('login-form', LoginForm);
