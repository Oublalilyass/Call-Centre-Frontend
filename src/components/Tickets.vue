<template>
  <div>
    <h2>All Tickets</h2>
    <button @click="addNewTicket">Add New Ticket</button>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <p>Subject: {{ ticket.subject }}</p>
        <p>Details: {{ ticket.details }}</p>
        <p>Status: {{ ticket.status }}</p>
        <div v-if="ticket.status !== 'resolved'">
          <button @click="updateStatus(ticket.id, 'resolved')">Mark as Resolved</button>
        </div>
        <input type="text" v-model="newComment" placeholder="Add a comment">
        <button @click="addComment(ticket.id)">Add Comment</button>
        <ul>
          <li v-for="comment in ticket.comments" :key="comment.id">
            {{ comment.text }} - {{ comment.created_at }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tickets: [], // Placeholder for ticket data
      newComment: ''
    };
  },
  mounted() {
    // Fetch ticket data from backend API
    axios.get('/api/tickets')
      .then(response => {
        this.tickets = response.data;
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  },
  methods: {
    updateStatus(ticketId, newStatus) {
      axios.put(`/api/tickets/${ticketId}`, { status: newStatus })
        .then(response => {
          // Update ticket status in UI
          const index = this.tickets.findIndex(ticket => ticket.id === ticketId);
          if (index !== -1) {
            this.tickets[index].status = newStatus;
          }
        })
        .catch(error => {
          console.error('Error updating ticket status:', error);
        });
    },
    addComment(ticketId) {
      const comment = {
        text: this.newComment,
        // Optionally, you may include the user ID or name who added the comment
      };
      axios.post(`/api/tickets/${ticketId}/comments`, comment)
        .then(response => {
          // Update ticket comments in UI
          const index = this.tickets.findIndex(ticket => ticket.id === ticketId);
          if (index !== -1) {
            this.tickets[index].comments.push(response.data);
            this.newComment = ''; // Clear the new comment input field
          }
        })
        .catch(error => {
          console.error('Error adding comment:', error);
        });
    },
    addNewTicket() {
      // Handle logic for adding a new ticket (e.g., show a form or navigate to a new route)
      this.$router.push({ name: 'AddNewTicket' });
      console.log('Adding a new ticket');
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}
button:hover {
  background-color: #45a049;
}
input[type="text"] {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
