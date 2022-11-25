<template>
    <section>
        <h3>Enter your email and password to login</h3>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="text" name="email" v-model="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="text" name="password" v-model="password">
            </div>
            <button>Login</button>
            <p>No account?  Click to <span @click="linkToSignup">sign-up</span></p>
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
        linkToSignup() {
            this.$router.push('/signup')
        }
    },
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    margin: 10px
}   

h3 {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    width: 100%;
}

div {
    width: 100%;
    display: flex;
    padding: 10px 0;
    justify-content: center;
}

input {
    width: 255px;
    
}

label {
    display: flex;
    justify-content: right;
    padding: 0 8px;
    width: 100px;
    color: #FD2D01;
}

button {
    display: flex;
    justify-content: center;
    width: 26%;
    margin: 8px 37% 0 37%;
    background-color: #FD2D01;
    color: #FFFFFF;
    border:  black solid 1px
}

span {
    color: blue;
    padding-left: 5px
}

p {
    width: 100%;
    margin-top: 30px;
    justify-content: center;
    display: flex;
}
</style>