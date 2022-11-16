<template>
    <h2>Complete form to Sign-Up</h2>
    <form>
        <div>
            <label for="first-name">First Name</label>
            <input type="text" name="first-name">
        </div>
        <div>
            <label for="last-name">Last Name</label>
            <input type="text" name="last-name">
        </div>
        <div>
            <label for="email">Groupomania Email</label>
            <input type="text" name="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" name="password">
        </div>
        <div>
            <label for="confirm-password">Confirm Password</label>
            <input type="text" name="confirm-password">
        </div>
        <button>Sumbit</button>
    </form>
</template>

<script>
export default ({
    
})

</script>

<style scoped>
div {
    padding: 5px
}

label {
    padding-right: 5px
}
</style>