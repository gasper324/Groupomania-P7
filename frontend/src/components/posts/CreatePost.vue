<template>
    <nav>
        <router-link @click="logout" to="/login">Logout</router-link>
        <router-link to="/viewPosts">View Posts</router-link>
        <router-link to="/deleteAccount">Delete Account</router-link>
    </nav>
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
        <div>
            <label for="title">Post Title</label>
            <input type="text" name="title" v-model="title">
        </div>
        <div>
            <label for="text">Write your post here</label>
            <input type="textarea" name="text" v-model="postText">
        </div> 
        <div>
            <label for="img-desc">Image description</label>
            <input type="text" name="img-desc" v-model="description">
        </div>
        <div id="upload-image-container">
            <label for="image">Upload Image</label>
            <input id="image-selection" type="file" accept="image/*" name="image" ref="file" @change="uploadPhoto">
        </div>
        <button>Sumbit Post</button>
    </form>
</template>

<script>

export default {
    data() {
        return {
            file: null
        }
    },
    methods: {
        uploadPhoto() {
            this.file = this.$refs.file.files[0];
            this.fileSource = URL.createObjectURL(this.$refs.file.files[0])
        },
        async createPost() {
            let formData = [];
            let requestOptions = {};
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (this.file != null) {
                console.log('Bye')
                let post = JSON.stringify({
                    title: this.title,
                    description: this.description,
                    postText: this.postText,
                    usersRead: [],
                    postedBy: userId
                });
                console.log(post)
                formData = new FormData();
                formData.set('image', this.file);
                formData.set('post', post);
                console.log(formData);
                requestOptions = {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    body: formData
                }
            await fetch("http://localhost:3000/api/memes", requestOptions);
            } else {
                console.log('Here')
                formData = {
                    title: this.title,
                    description: this.description,
                    postText: this.postText,
                    usersRead: [],
                    postedBy: userId
                }
                requestOptions = {        
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(formData)
                }
                await fetch("http://localhost:3000/api/memes/noImage", requestOptions);
            }
            
            this.$router.push('/viewPosts')
        },
        logout() {
            localStorage.clear()
        }
    }
}
</script>

<style scoped>
input {
    width: 255px;
    
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

#image-selection {
    width: 200px;
    margin: 0;
}
</style>