<template>
  <div>
    <!-- Overview of all calls -->
    <h2>Overview of All Calls</h2>
    <ul>
      <li v-for="call in calls" :key="call.id">{{ call.subject }}</li>
    </ul>
    
    <!-- Notifications for new tickets and important updates -->
    <h2>Notifications</h2>
    <ul>
      <li v-for="notification in notifications" :key="notification.id">{{ notification.message }}</li>
    </ul>
    
    <!-- Agent Performance Report -->
    <h2>Agent Performance Report</h2>
    <ul>
      <li v-for="agent in agentPerformanceData" :key="agent.id">
        {{ agent.name }} - Total Calls: {{ agent.totalCalls }} - Average Duration: {{ agent.averageDuration }} minutes
      </li>
    </ul>
    
    <!-- Ticket Status Report -->
    <h2>Ticket Status Report</h2>
    <ul>
      <li v-for="status in ticketStatusData" :key="status.status">
        {{ status.status }} - Count: {{ status.count }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      calls: [], // Placeholder for call data
      notifications: [], // Placeholder for notification data
      agentPerformanceData: [], // Placeholder for agent performance data
      ticketStatusData: [] // Placeholder for ticket status data
    };
  },
  mounted() {
    // Fetch call data from backend API
    axios.get('/api/calls')
      .then(response => {
        this.calls = response.data;
      })
      .catch(error => {
        console.error('Error fetching calls:', error);
      });
    // Fetch notification data from backend API
     axios.get('/api/notifications')
      .then(response => {
        this.notifications = response.data;
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
    // Fetch agent performance data from backend API
      axios.get('/api/reports/agent-performance')
      .then(response => {
        this.agentPerformanceData = response.data;
      })
      .catch(error => {
        console.error('Error fetching agent performance data:', error);
      });
    // Fetch ticket status data from backend API
       axios.get('/api/reports/ticket-status')
      .then(response => {
        this.ticketStatusData = response.data;
      })
      .catch(error => {
        console.error('Error fetching ticket status data:', error);
      });
  }
};
</script>
