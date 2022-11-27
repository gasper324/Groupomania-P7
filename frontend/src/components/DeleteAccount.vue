<template>
    <nav>
        <router-link @click="logout" to="/login">Logout</router-link>
        <router-link to="/viewPosts">View Posts</router-link>
        <router-link to="/createPost">Create Post</router-link>
    </nav>
    <section v-if="fullName !== null">
        <h2>Account Deletion</h2>
        <h3><span>{{fullName}}</span>, click the button below to delete your account</h3>
        <h4>This action cannot be undone</h4>
        <button @click="deleteAccount">Delete Account</button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            fullName: localStorage.getItem('fullName')
        }
    },
    methods: {
        async deleteAccount() {
            const token = localStorage.getItem('token');
            const userId = parseInt(localStorage.getItem('userId'));
            console.log(userId)
            await fetch("http://localhost:3000/api/user/deleteAccount/" + userId, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    }
            });
            localStorage.clear();
            this.$router.push('/');
        },
        logout() {
            localStorage.clear()
        }
    }
}
</script>