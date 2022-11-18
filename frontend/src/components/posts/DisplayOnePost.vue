<template>
    <section v-for="post in postArray" :key="post">
        <h2>{{post.title}}</h2>
        <img alt="post.description" :src="post.image">
        <p>{{post.description}}</p>
        <p>{{post.text}}</p>
    </section>
</template>

<script>
export default {
    data() {
        return {
            postArray: [],
            postId:''
        }
    },

    methods: {
        async getPosts() {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/api/memes/" + this.postId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
            const data = await response.json()
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                this.postArray.push(data[i])
            }
        }
    },
    created() {
        this.postId = (this.$route.params.postid);
        console.log(this.postId)
        this.getPosts()
        

    }
}
</script>
