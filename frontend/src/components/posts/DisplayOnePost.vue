<template>
    <section>
        <h2>{{post.title}}</h2>
        <img alt="post.description" :src="post.image">
        <p>{{post.description}}</p>
        <p>{{post.posttext}}</p>
        <button @click="editPostVisible">Edit Post</button>
        <button @click="deletePost">Delete Post</button>
    </section>
    <section v-if="editVisible">    
        <h2>Edit post</h2>
            <form @submit.prevent="createPost">
                <div>
                    <label for="title">Post Title</label>
                    <input type="text" name="title" v-model="post.title">
                </div>
                <div>
                    <label for="image">Upload Image</label>
                    <input type="file" accept="image/*" name="image" @change="uploadPhoto">
                </div>
                <div>
                    <label for="img-desc">Image description</label>
                    <input type="text" name="img-desc" v-model="post.description">
                </div>
                <div>
                    <label for="text">Write your post here</label>
                    <input type="textarea" name="text" v-model="post.posttext">
                </div>
                <button @click="submitEdits">Submit Post Edits</button>
            </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            post: {},
            postId:'',
            editVisible: false,
        }
    },

    methods: {
        async getPost() {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/api/memes/" + this.postId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
            const data = await response.json()
            console.log(data)
            this.post = data[0]
            console.log(this.post.title)


            console.log('push')
            const userId = localStorage.getItem('userId')
            const postData = {
                title: this.post.title,
                image: this.post.image,
                description: this.post.description,
                postText: this.post.posttext,
                usersRead: userId
            };
            await fetch("http://localhost:3000/api/memes/" + this.postId, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(postData)
                })
        },
        editPostVisible() {
            this.editVisible = !this.editVisible
        },
        async submitEdits() {
            console.log('edits')
            const postData = {
                title: this.post.title,
                image: this.post.image,
                description: this.post.description,
                postText: this.post.posttext,
            };
            const token = localStorage.getItem('token');
            await fetch("http://localhost:3000/api/memes/" + this.postId, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(postData)
                })
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
        this.getPost()
    }
}
</script>
