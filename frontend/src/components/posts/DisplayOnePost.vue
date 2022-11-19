<template>
    <section v-for="post in postArray" :key="post">
        <h2>{{post.title}}</h2>
        <img alt="post.description" :src="post.image">
        <p>{{post.description}}</p>
        <p>{{post.text}}</p>
        <button @click="editPostVisible">Edit Post</button>
        <button @click="deletePost">Delete Post</button>
    </section>
    <section v-if="editVisible">    
        <h2>Edit post</h2>
            <form @submit.prevent="createPost">
                <div>
                    <label for="title">Post Title</label>
                    <input type="text" name="title" v-model="title">
                </div>
                <div>
                    <label for="image">Upload Image</label>
                    <input type="file" accept="image/*" name="image" @change="uploadPhoto">
                </div>
                <div>
                    <label for="img-desc">Image description</label>
                    <input type="text" name="img-desc" v-model="imgDesc">
                </div>
                <div>
                    <label for="text">Write your post here</label>
                    <input type="textarea" name="text" v-model="text">
                </div>
                <button @click="submitEdits">Submit Post Edits</button>
            </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            postArray: [],
            postId:'',
            editVisible: false
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
            this.postArray.push(data[0])

        },
        editPostVisible() {
            this.editVisible = !this.editVisible
        },
        submitEdits() {
            console.log('edits')
        },
        async deletePost() {
            console.log('delete')
            const token = localStorage.getItem('token');
            await fetch("http://localhost:3000/api/memes/" + this.postId, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    }
            });
            this.$router.push('/viewPosts')
        }
    },
    created() {
        this.postId = (this.$route.params.postid);
        this.getPosts()
    }
}
</script>
