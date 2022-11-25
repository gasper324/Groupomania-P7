<template>
    <header>
        <img src="../assets/Groupomania_Logos/icon-above-font.png" alt="Groupomania Logo" id="header-logo">
        <h2></h2>
    </header>
</template>

<script>

export default {
    data() {
        return {
            userId: "",
            userFullName: "",
            isLoggedIn: false
        }
    },
}
</script>

<style scoped>
#header-logo {
    width: 350px;
    height: 150px;
    object-fit: cover;

}

header {
    display: flex;
    justify-content: center;
}
</style>