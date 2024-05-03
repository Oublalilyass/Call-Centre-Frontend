<template>
  <div>
    <h2>Add New Ticket</h2>
    <form @submit.prevent="addTicket">
      <div class="form-group">
        <label for="agent_id">Agent:</label>
        <select id="agent_id" v-model="ticket.agent_id" required>
          <option value="">Select Agent</option>
          <!-- Option values will be populated dynamically -->
        </select>
      </div>
      <div class="form-group">
        <label for="supervisor_id">Supervisor:</label>
        <select id="supervisor_id" v-model="ticket.supervisor_id" required>
          <option value="">Select Supervisor</option>
          <!-- Option values will be populated dynamically -->
        </select>
      </div>
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input type="text" id="subject" v-model="ticket.subject" required>
      </div>
      <div class="form-group">
        <label for="details">Details:</label>
        <textarea id="details" v-model="ticket.details" rows="4" required></textarea>
      </div>
      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" v-model="ticket.status" required>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <button type="submit">Add Ticket</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ticket: {
        agent_id: '',
        supervisor_id: '',
        subject: '',
        details: '',
        status: 'open'
      },
      agents: [], // Placeholder for agent data
      supervisors: [] // Placeholder for supervisor data
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

    // Fetch supervisor data from backend API
    axios.get('/api/supervisors')
      .then(response => {
        this.supervisors = response.data;
      })
      .catch(error => {
        console.error('Error fetching supervisors:', error);
      });
  },
  methods: {
    addTicket() {
      axios.post('/api/tickets', this.ticket)
        .then(response => {
          // Handle success (e.g., show success message, redirect to all tickets page)
          console.log('Ticket added successfully:', response.data);
          // Redirect to all tickets page or perform any other action as needed
        })
        .catch(error => {
          // Handle error (e.g., show error message)
          console.error('Error adding ticket:', error);
        });
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
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
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
