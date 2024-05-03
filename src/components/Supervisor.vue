<template>
  <div class="supervisors-container">
    <h2>Supervisors</h2>

    <!-- Add Supervisor Form -->
    <form @submit.prevent="addSupervisor" class="form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newSupervisor.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newSupervisor.email" required>
      </div>
      <button type="submit" class="btn">Add Supervisor</button>
    </form>

    <!-- Table of Supervisors -->
    <table class="supervisors-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="supervisor in supervisors" :key="supervisor.id">
          <td>{{ supervisor.name }}</td>
          <td>{{ supervisor.email }}</td>
          <td>
            <button @click="editSupervisor(supervisor)" class="btn btn-edit">Edit</button>
            <button @click="deleteSupervisor(supervisor.id)" class="btn btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Supervisor Form -->
    <div v-if="editingSupervisor" class="edit-form">
      <h3>Edit Supervisor</h3>
      <form @submit.prevent="updateSupervisor" class="form">
        <div class="form-group">
          <label for="edit-name">Name:</label>
          <input type="text" id="edit-name" v-model="editingSupervisor.name" required>
        </div>
        <div class="form-group">
          <label for="edit-email">Email:</label>
          <input type="email" id="edit-email" v-model="editingSupervisor.email" required>
        </div>
        <button type="submit" class="btn btn-update">Update</button>
        <button @click="cancelEdit" class="btn btn-cancel">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      supervisors: [],
      newSupervisor: { name: '', email: '' },
      editingSupervisor: null
    };
  },
  mounted() {
    this.fetchSupervisors();
  },
  methods: {
    fetchSupervisors() {
      axios.get('/api/supervisors')
        .then(response => {
          this.supervisors = response.data;
        })
        .catch(error => {
          console.error('Error fetching supervisors:', error);
        });
    },
    addSupervisor() {
      axios.post('/api/supervisors', this.newSupervisor)
        .then(response => {
          this.supervisors.push(response.data);
          this.newSupervisor = { name: '', email: '' };
        })
        .catch(error => {
          console.error('Error adding supervisor:', error);
        });
    },
    editSupervisor(supervisor) {
      // Set the editingSupervisor data to the selected supervisor
      this.editingSupervisor = { ...supervisor };
    },
    updateSupervisor() {
      axios.put(`/api/supervisors/${this.editingSupervisor.id}`, this.editingSupervisor)
        .then(response => {
          // Update the supervisor in the supervisors array
          const index = this.supervisors.findIndex(s => s.id === response.data.id);
          if (index !== -1) {
            this.supervisors.splice(index, 1, response.data);
            this.editingSupervisor = null; // Reset editingSupervisor after update
          }
        })
        .catch(error => {
          console.error('Error updating supervisor:', error);
        });
    },
    cancelEdit() {
      // Reset editingSupervisor without updating
      this.editingSupervisor = null;
    },
    deleteSupervisor(supervisorId) {
      axios.delete(`/api/supervisors/${supervisorId}`)
        .then(() => {
          // Remove the deleted supervisor from the supervisors array
          this.supervisors = this.supervisors.filter(s => s.id !== supervisorId);
        })
        .catch(error => {
          console.error('Error deleting supervisor:', error);
        });
    }
  }
};
</script>

<style scoped>
.supervisors-container {
  max-width: 800px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
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

.btn-edit {
  background-color: #007bff;
  color: #fff;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
}

.btn-update {
  background-color: #28a745;
  color: #fff;
}

.btn-cancel {
  background-color: #ffc107;
  color: #212529;
}

.supervisors-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.supervisors-table th,
.supervisors-table td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: left;
}

.edit-form {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.edit-form h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

</style>
