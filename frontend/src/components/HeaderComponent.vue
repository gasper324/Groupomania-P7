<template>
    <header>
        <img src="../assets/Groupomania_Logos/icon-above-font.png" alt="Groupomania Logo" id="header-logo">
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

h3 {
    position: absolute;
    top:0px;
    left:10px;
    z-index: 2;
}
</style>