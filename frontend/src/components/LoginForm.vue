<template>
    <h2>Please Log-In</h2>
    <form>
        <label for="email">Email</label>
        <input type="text" name="email">
        <label for="password">Password</label>
        <input type="text">
        <button>Sign in</button>
        <p>No account?  Click to sign-up</p>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

input {
    width: 80%;
}
</style>