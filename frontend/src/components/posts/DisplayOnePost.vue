<template>
    <nav>
        <router-link @click="logout" to="/login">Logout</router-link>   
        <router-link to="/viewPosts">View Posts</router-link>
        <router-link to="/createPost">Create Post</router-link>
    </nav>
    <section>
        <h2>{{post.title}}</h2>
        <img :alt="post.description" :src="post.image">
        <p>{{post.posttext}}</p>
        <div v-if="checkUserId() === true">
            <button @click="editPostVisible">{{editPostToggle}}</button>
            <button v-if="!editVisible" @click="deletePost">Delete Post</button>
        </div>
    </section>
    <section v-if="editVisible">    
        <h2>Edit post</h2>
            <form @submit.prevent="createPost">
                <div>
                    <label for="title">Post Title</label>
                    <input type="text" name="title" v-model="post.title" ref="title">
                </div>
                <div>
                    <label for="text">Write your post here</label>
                    <input type="textarea" name="text" v-model="post.posttext">
                </div>                   
                <div>
                    <label for="img-desc">Image description</label>
                    <input type="text" name="img-desc" v-model="post.description">
                </div>             
                <div>
                    <label for="image">Upload Image</label>
                    <input type="file" accept="image/*" name="image" ref="file" @change="uploadPhoto">
                </div>
                <button @click="submitEdits">Submit Post Edits</button>
                <button @click="deletePost">Delete Post</button>
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
            editPostToggle: "Edit Post",
            file: null,
            title: ""
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
            console.log(data[0])
            this.post = data[0]
            const userId = parseInt(localStorage.getItem('userId'))
            if (this.post.usersread.includes(userId) === false) {
                const postData = {userNum: userId} 
                    await fetch("http://localhost:3000/api/memes/usersRead/" + this.postId, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(postData)
                })
            }

        },
        editPostVisible() {
            this.editVisible = !this.editVisible
            if (this.editVisible === false) {
                this.editPostToggle = "Edit Post"
            } else {
                this.editPostToggle = "Cancel Edit"
            }
        },
        uploadPhoto() {
            this.file = this.$refs.file.files[0];
            this.fileSource = URL.createObjectURL(this.$refs.file.files[0])
        },
        async submitEdits() {
            let formData = [];
            let requestOptions = {};
            const token = localStorage.getItem('token');
            if (this.file != null) {
                let post = JSON.stringify({
                    title: this.post.title,
                    description: this.post.description,
                    postText: this.post.posttext,
                });
                console.log(post)
                formData = new FormData();
                formData.set('image', this.file);
                formData.set('post', post);
                console.log(formData.post);
                requestOptions = {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    body: formData
                } 
                await fetch("http://localhost:3000/api/memes/" + this.postId, requestOptions);
            } else {
                console.log('Here')
                formData = {
                    title: this.post.title,
                    description: this.post.description,
                    postText: this.post.posttext
                }
                requestOptions = {        
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(formData)}
                await fetch("http://localhost:3000/api/memes/noImage/" + this.postId, requestOptions);
            }
            this.$router.push('/viewPosts')
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
        },
        checkUserId() {
            if (this.post.postedby == localStorage.getItem('userId')) {
                return true
            } return false
        },
        logout() {
            localStorage.clear()
        }
    },
    created() {
        this.postId = (this.$route.params.postid);
        this.getPost();
    }
}
</script>

<style scoped>
img {
    width: 80%;
    max-width: 550px;
    border-radius: 2%;
}
label {
    display: flex;
    justify-content: center;
    padding: 12px 0 5px 0;
    width: 100%;
    color: #FD2D01;
}

form {
    display: flex;
    flex-direction: column;
    margin: 10px
}

</style>
