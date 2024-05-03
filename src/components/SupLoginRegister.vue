<template>
  <div class="login-register-container">
    <div v-if="!isRegistered">
      <h2>Register</h2>
      <form @submit.prevent="registerSupervisor" class="form">
        <div class="form-group">
          <label for="register-name">Name:</label>
          <input type="text" id="register-name" v-model="registerData.name" required>
        </div>
        <div class="form-group">
          <label for="register-email">Email:</label>
          <input type="email" id="register-email" v-model="registerData.email" required>
        </div>
        <div class="form-group">
          <label for="register-password">Password:</label>
          <input type="password" id="register-password" v-model="registerData.password" required>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <p>Already have an account? <router-link to="/supervisor-login">Login here</router-link></p>
      </form>
    </div>

    <div v-else>
      <h2>Login</h2>
      <form @submit.prevent="loginSupervisor" class="form">
        <div class="form-group">
          <label for="login-email">Email:</label>
          <input type="email" id="login-email" v-model="loginData.email" required>
        </div>
        <div class="form-group">
          <label for="login-password">Password:</label>
          <input type="password" id="login-password" v-model="loginData.password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <p>Don't have an account? <router-link to="/supervisor-register">Register here</router-link></p>
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
      registerData: { name: '', email: '', password: '' },
      loginData: { email: '', password: '' }
    };
  },
  methods: {
    registerSupervisor() {
      axios.post('/api/supervisor/register', this.registerData)
        .then(response => {
          console.log('Supervisor registered successfully:', response.data);
          // Redirect to login page after successful registration
          this.$router.push('/SupLoginRegister');
        })
        .catch(error => {
          console.error('Error registering supervisor:', error);
        });
    },
    loginSupervisor() {
      axios.post('/api/supervisor/login', this.loginData)
        .then(response => {
          console.log('Supervisor logged in successfully:', response.data);
          // Redirect to dashboard page after successful login
          this.$router.push('/dashboard');
        })
        .catch(error => {
          console.error('Error logging in supervisor:', error);
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
input[type="password"],
input[type="text"] {
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

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

p {
  margin-top: 1rem;
  text-align: center;
}

p a {
  color: #007bff;
  text-decoration: none;
}
</style>
