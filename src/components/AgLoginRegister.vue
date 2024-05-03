<template>
  <div class="login-register-container">
    <div v-if="!isRegistered">
      <h2>Register</h2>
      <form @submit.prevent="registerAgent" class="form">
        <div class="form-group">
          <label for="register-email">Email:</label>
          <input type="email" id="register-email" v-model="registerData.email" required>
        </div>
        <div class="form-group">
          <label for="register-password">Password:</label>
          <input type="password" id="register-password" v-model="registerData.password" required>
        </div>
        <button type="submit" class="btn">Register</button>
        <p>Already have an account? <a href="#" @click="toggleRegister">Login here</a></p>
      </form>
    </div>

    <div v-else>
      <h2>Login</h2>
      <form @submit.prevent="loginAgent" class="form">
        <div class="form-group">
          <label for="login-email">Email:</label>
          <input type="email" id="login-email" v-model="loginData.email" required>
        </div>
        <div class="form-group">
          <label for="login-password">Password:</label>
          <input type="password" id="login-password" v-model="loginData.password" required>
        </div>
        <button type="submit" class="btn">Login</button>
        <p>Don't have an account? <a href="#" @click="toggleRegister">Register here</a></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isRegistered: false,
      registerData: { email: '', password: '' },
      loginData: { email: '', password: '' }
    };
  },
  methods: {
    toggleRegister() {
      this.isRegistered = !this.isRegistered;
    },
    registerAgent() {
      axios.post('/api/register', this.registerData)
        .then(response => {
          console.log('Agent registered successfully:', response.data);
           // Redirect to login page after successful registration
          this.$router.push('/login');        })
        .catch(error => {
          console.error('Error registering agent:', error);
        });
    },
    loginAgent() {
      axios.post('/api/login', this.loginData)
        .then(response => {
          console.log('Agent logged in successfully:', response.data);
          // Redirect to dashboard page after successful login
          this.$router.push('/dashboard');        })
        .catch(error => {
          console.error('Error logging in agent:', error);
        });
    }
  }
};
</script>

<style scoped>
.login-register-container {
  max-width: 400px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

a {
  color: #007bff;
  text-decoration: none;
}

</style>
