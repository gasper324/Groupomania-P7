<template>
    <nav>
        <router-link to="/login">Log-in</router-link>
    </nav>
    <h2>Complete form to Sign-Up</h2>
    <form @submit.prevent="submitForm">
        <div>
            <label for="first-name">First Name</label>
            <input type="text" name="first-name" v-model="firstName">
            <p v-if="firstName === ''">required</p>
        </div>
        <div>
            <label for="last-name">Last Name</label>
            <input type="text" name="last-name" v-model="lastName">
            <p v-if="lastName === ''">required</p>
        </div>
        <div>
            <label for="email">Groupomania Email</label>
            <input type="text" name="email" v-model="email">
            <p v-if="email === ''">required</p>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password">
            <p v-if="checkPasswordLength()">Must contain at least 8 characters</p>
        </div>
        <div>
            <label for="confirm-password">Confirm Password</label>
            <input type="password" name="confirm-password" v-model="confirmPassword">
            <p v-if="checkPasswordMatch()">Passwords must match</p>
        </div>
        <button>Sumbit</button>
    </form>
</template>

<script>
export default ({
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        async submitForm() {
            if (this.password !== this.confirmPassword) {
                console.log('Passwords do not match');
            } else if (this.password.length < 8) {
                console.log('Password must be at least 8 characters')
            } else if(this.email.includes('@groupomania.com') === false) {
                console.log('Must use your Groupomania email address')
            } else {
                const formData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                await fetch("http://localhost:3000/api/user", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
                this.$router.push('/login')
            }
        },
        checkPasswordMatch() {
            if (this.password === this.confirmPassword) {
                return false
            } return true
        },
        checkPasswordLength() {
            if (this.password.length < 8) {
                return true
            } return false
        }
    }
})

</script>

<style scoped>
div {
    padding: 5px
}

input {
    width: 255px;
}

label {
    display: flex;
    justify-content: center;
    padding: 12px 0 5px 0;
    width: 100%;
    color: #FD2D01;
}

form {
    display: flex;
    flex-direction: column;
    margin: 10px
}

.form-label {
    display: flex;

}

p {
    display: flex;
    justify-content: right;
    width: 245px;
    margin: 2px auto;
    font-style: italic;
    font-size: small;
}

</style>