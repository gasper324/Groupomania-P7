<template>
    <h2>Complete form to Sign-Up</h2>
    <form @submit.prevent="submitForm">
        <div>
            <label for="first-name">First Name</label>
            <input type="text" name="first-name" v-model="firstName">
        </div>
        <div>
            <label for="last-name">Last Name</label>
            <input type="text" name="last-name" v-model="lastName">
        </div>
        <div>
            <label for="email">Groupomania Email</label>
            <input type="text" name="email" v-model="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" name="password" v-model="password">
        </div>
        <div>
            <label for="confirm-password">Confirm Password</label>
            <input type="text" name="confirm-password" v-model="confirmPassword">
        </div>
        <button>Sumbit</button>
    </form>
</template>

<script>
export default ({
    data() {
        return {
            firstName: ''
        }
    },
    methods: {
        async submitForm() {
            if (this.password !== this.confirmPassword) {
                console.log('Passwords do not match');
            } else if (this.password.length < 8) {
                console.log('Password must be at least 8 characters')
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
                console.log('Post Successful');
            }
        }
    }
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