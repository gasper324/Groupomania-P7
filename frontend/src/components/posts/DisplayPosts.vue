<template>
    <router-link v-for="post in postsArray" :key="post.postid" @click="viewPost" :to="'/viewPost/' + post.postid">
        <section>
            <h1 v-if="post.usersread.includes(parseInt(userId)) === true">Post Read</h1>
            <h2>{{post.title}}</h2>
            <img :src="post.image">
            <p>{{post.description}}</p>
            <p>{{post.posttext}}</p>
        </section>
    </router-link>
</template>

<script>

export default {
    data() {
        return {
            postsArray: [],
            isRead: false,
            userId: localStorage.getItem('userId')
        }
    },
    methods: {
        async getPosts() {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/api/memes", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
            const data = await response.json()
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                this.postsArray.push(data[i])
            }
        },
    },
    created() {
        this.getPosts()
        this.page = "viewPosts"
    }
};

</script>

<style scoped>
img {
    width: 200px;
    height: 200px
}
</style>