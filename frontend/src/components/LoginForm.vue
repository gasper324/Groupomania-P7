<template>
    <section>
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
    </section>
</template>

<script>
export default{
    methods: {
        async login() {
            localStorage.clear()
            const loginData = {email: this.email, password: this.password}
            const response = await fetch("http://localhost:3000/api/user/login", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(loginData)
                });
            const data = await response.json()
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', data.token);
            const userId = localStorage.getItem('userId')
            const token = localStorage.getItem('token')
            const userResponse = await fetch("http://localhost:3000/api/user/" + userId, {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },       
            })
            const userData = await userResponse.json()
            console.log(userData)
            localStorage.setItem('fullName', userData[0].firstname + " " + userData[0].lastname)
            localStorage.setItem('firstName', userData[0].firstname)
            this.$router.push('/viewPosts')

        },
        loginCheck() {
            console.log(localStorage.getItem('userId'));
            if (localStorage.getItem('userId') !== null) {
                return false
            } else {
                return true
            }
        }
    },
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