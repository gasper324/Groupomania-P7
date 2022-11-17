<template>
    <h2>Please Log-In</h2>
    <form @submit.prevent="login">
        <div>
            <label for="email">Email</label>
            <input type="text" name="email" v-model="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" name="password" v-model="password">
        </div>
        <button>Sign in</button>
        <p>No account?  Click to sign-up</p>
    </form>
</template>

<script>
export default{
    methods: {
        async login() {
            console.log(this.email, this.password)
            const loginData = {email: this.email, password: this.password}
            const response = await fetch("http://localhost:3000/api/user/login", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(loginData)
                });
            const data = await response.json()
            console.log(data)
        }
    }
}
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
}

input {
    width: 80%;
}
</style>