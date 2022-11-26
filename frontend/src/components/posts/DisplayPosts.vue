<template>
    <nav>
        <router-link to="/createPost">Create Post</router-link>
        <router-link to="/deleteAccount">Delete Account</router-link>
    </nav>
    <router-link id="post" v-for="post in postsArray" :key="post.postid" @click="viewPost" :to="'/viewPost/' + post.postid">
        <section class="posts">
            <div>
            <h2>{{post.title}}</h2>
            <h2 id="read" v-if="post.usersread.includes(parseInt(userId)) === true">read</h2>
            <h2 id="unread" v-else>unread</h2>
            </div>
            <img v-if="post.image !== null" :src="post.image" :alt="post.description">
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
    height: 200px;
    border-radius: 10px;
}   
.posts {
    color: black;
    margin: 0;
    width: 300px;
}
.posts:hover {
    background-color: aliceblue;
}

div {
    display: flex;
    justify-content: center;
}

h2 {
    padding: 10px
}

#read {
    background-color: #01d1fd;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    display: flex;
    align-items: center;
    height: 16px;
    margin: 34px 0 0 0
}

#unread {
    background-color: #cc0000;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    display: flex;
    align-items: center;
    height: 16px;
    margin: 34px 0 0 0
}

#post {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
}
</style>