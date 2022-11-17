<template>
    <h2>Create a post</h2>
    <form @submit.prevent="createPost">
        <div>
            <label for="title">Post Title</label>
            <input type="text" name="title" v-model="title">
        </div>
        <div>
            <label for="img-desc">Please breifly describe the image you are posting</label>
            <input type="text" name="img-desc" v-model="imgDesc">
        </div>
        <div>
            <label for="text">Write your post here</label>
            <input type="text" name="text" v-model="text">
        </div>
        <button>Post</button>
    </form>
</template>

<script>
export default {
    methods: {
        createPost() {
            const postdata = {
                title: this.title,
                description: this.imgDesc,
                postText: this.text
            }
            console.log(postdata)
        }
    }
}
</script>