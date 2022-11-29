<template>
    <nav>
        <router-link @click="logout" to="/login">Logout</router-link>
        <router-link to="/createPost">Create Post</router-link>
        <router-link to="/deleteAccount">Delete Account</router-link>
    </nav>
    <section class="post-container">
        <router-link id="post" v-for="post in postsArray" :key="post.postid" :to="'/viewPost/' + post.postid">
            <section class="posts">
                <div>
                    <h2>{{post.title}}</h2>
                    <h2 id="read" v-if="post.usersread.includes(parseInt(userId)) === true">read</h2>
                    <h2 id="unread" v-else>unread</h2>
                </div>
                <img v-if="post.image !== null" :src="post.image" :alt="post.description">
                <p id="posttext">{{post.posttext}}</p>
            </section>
        </router-link>
    </section>
</template>

<script>

export default {
    data() {
        return {
            postsArray: [],
            isRead: false,
            userId: localStorage.getItem('userId'),
            
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
            for (let i = 0; i < data.length; i++) {
                this.postsArray.push(data[i])
            }
        },
        logout() {
            localStorage.clear()
        }
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
    object-fit: cover
}   
.posts {
    color: black;
    margin: 0;
    width: 300px;
}
.posts:hover {
    background-color: aliceblue;
}

.post-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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

#posttext {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 180px;
    margin: 0 auto;
}

</style>