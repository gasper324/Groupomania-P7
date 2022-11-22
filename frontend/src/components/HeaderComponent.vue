<template>
    <header>
        <img src="../assets/Groupomania_Logos/icon.png" alt="Groupomania Logo" id="header-logo">
        <h2>Groupomania</h2>
        <nav>
            <router-link to="/login">Log-In</router-link>
            <router-link to="/signup">Sign-Up</router-link>
            <router-link v-if="this.page !== 'viewPost'" to="/viewPosts">View Posts</router-link>
            <router-link to="/createPost">Create Post</router-link>
        </nav>
    </header>
</template>

<script>

</script>
<style scoped>
#header-logo {
    width: 25%;
}

header {
    display: flex;
    border: solid 5px black;
    background-color: pink;
}
</style>