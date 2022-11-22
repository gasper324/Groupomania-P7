<template>
    <h2>Create a post</h2>
    <form @submit.prevent="createPost">
        <div>
            <label for="title">Post Title</label>
            <input type="text" name="title" v-model="title">
        </div>
        <div>
            <label for="image">Upload Image</label>
            <input type="file" accept="image/*" name="image" ref="file" @change="uploadPhoto">
        </div>
        <div>
            <label for="img-desc">Image description</label>
            <input type="text" name="img-desc" v-model="description">
        </div>
        <div>
            <label for="text">Write your post here</label>
            <input type="textarea" name="text" v-model="postText">
        </div>
        <button>Post</button>
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
            // this.image = event.target.files[0].name
            // console.log(this.image)
            this.file = this.$refs.file.files[0];
            this.fileSource = URL.createObjectURL(this.$refs.file.files[0])
            console.log(this.file)
            console.log(this.fileSource)
        },
        async createPost() {
            let formData = [];
            let requestOptions = {};
            const token = localStorage.getItem('token');
            console.log(this.file)
            if (this.file != null) {
                console.log('Bye')
                let post = JSON.stringify({
                    title: this.title,
                    description: this.description,
                    postText: this.postText
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
            } else {
                console.log('Here')
                formData = {
                    title: this.title,
                    description: this.description,
                    postText: this.postText
                }
                requestOptions = {        
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(formData)}
            }
            await fetch("http://localhost:3000/api/memes", requestOptions);
        }
    }
}
</script>