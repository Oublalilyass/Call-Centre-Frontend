<template>
  <div>
    <h2>Record Call Details</h2>
    <form @submit.prevent="recordCall">
      <div class="form-group">
        <label for="agent_id">Agent:</label>
        <select id="agent_id" v-model="call.agent_id" required>
          <option value="">Select Agent</option>
          <option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="call_datetime">Call Datetime:</label>
        <input type="datetime-local" id="call_datetime" v-model="call.call_datetime" required>
      </div>
      <div class="form-group">
        <label for="duration">Duration (minutes):</label>
        <input type="number" id="duration" v-model.number="call.duration" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input type="text" id="subject" v-model="call.subject" required>
      </div>
      <button type="submit">Record Call</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      call: {
        agent_id: '',
        call_datetime: '',
        duration: '',
        subject: ''
      },
      agents: [] // Placeholder for agent data
    };
  },
  mounted() {
    // Fetch agent data from backend API
    axios.get('/api/agents')
      .then(response => {
        this.agents = response.data;
      })
      .catch(error => {
        console.error('Error fetching agents:', error);
      });
  },
  methods: {
    recordCall() {
      axios.post('/api/calls', this.call)
        .then(response => {
          // Handle success (e.g., show success message, reset form)
          console.log('Call recorded successfully:', response.data);
          this.resetForm();
        })
        .catch(error => {
          // Handle error (e.g., show error message)
          console.error('Error recording call:', error);
        });
    },
    resetForm() {
      // Reset the form fields after successful submission
      this.call = {
        agent_id: '',
        call_datetime: '',
        duration: '',
        subject: ''
      };
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
}
input[type="text"],
input[type="number"],
input[type="datetime-local"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
