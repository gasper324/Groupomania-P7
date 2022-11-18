<template>
    <h2>Create a post</h2>
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
        <button>Post</button>
    </form>
</template>

<script>

export default {
    data() {
        return {
            image: null
        }
    },
    methods: {
        uploadPhoto(event) {
            this.image = event.target.files[0].name
            console.log(this.image)
        },
        async createPost() {
            const postData = {
                title: this.title,
                image: this.image,
                description: this.imgDesc,
                postText: this.text
            };
            const token = localStorage.getItem('token');
            console.log(postData);
            await fetch("http://localhost:3000/api/memes", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': 'Bearer ' + token
                    },
                    // enctype: "multipart/formdata",
                    body: JSON.stringify(postData)
                });
        }
    }
}
</script>