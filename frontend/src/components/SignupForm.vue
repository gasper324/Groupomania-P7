<template>
    <nav>
        <router-link to="/login">Log-in</router-link>
    </nav>
    <h2>Complete form to Sign-Up</h2>
    <form @submit.prevent="submitForm">
        <div>
            <label for="first-name">First Name</label>
            <input type="text" name="first-name" v-model="firstName" maxlength="50">
            <p v-if="firstName === ''">required</p>
        </div>
        <div>
            <label for="last-name">Last Name</label>
            <input type="text" name="last-name" v-model="lastName" maxlength="50">
            <p v-if="lastName === ''">required</p>
        </div>
        <div>
            <label for="email">Groupomania Email</label>
            <input type="text" name="email" v-model="email" maxlength="100">
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
        <strong v-if="errorMessage !== ''">Sign-Up failed.  {{errorMessage}}</strong>
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
            confirmPassword: '',
            errorMessage: ''
        }
    },
    methods: {
        async submitForm() {
            if (this.firstName === '') {
                this.errorMessage = 'First Name is a required field.'
                return
            }   
            if (this.lastName === '') {
                this.errorMessage = 'Last Name is a required field.'
                return
            }           
            if (this.email.includes('@groupomania.com') === false) {
                this.errorMessage = 'Must use your Groupomania email address'
                return
            }  
            if (this.password.length < 8) {
                this.errorMessage = 'Password must be at least 8 characters';
                return
            }
            if (this.password !== this.confirmPassword) {
                this.errorMessage = 'Passwords do not match.';
                return
            } 
                const formData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                const response = await fetch("http://localhost:3000/api/user", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
                const data = await response.json()
                if (data.error === undefined) { 
                    this.$router.push('/login/' + this.email)    
                } else if (data.error.constraint === 'user_email_key') {
                    this.errorMessage = ('An account already exists for this email')
                    return
                } else if (data.error.constraint !== undefined) {
                    this.errorMessage = data.error.constraint
                    return
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