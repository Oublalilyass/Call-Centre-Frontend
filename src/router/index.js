import Vue from 'vue';
import Router from 'vue-router';
import AllTickets from '@/components/AllTickets.vue';
import AddNewTicket from '@/components/AddNewTicket.vue';
import Login from '@/components/Login&Register.vue';
import Dashboard from './component/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AllTickets',
      component: AllTickets
    },
    {
      path: '/add-new-ticket',
      name: 'AddNewTicket',
      component: AddNewTicket
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/SupLoginRegister',
        redirect: '/SupLoginRegister'
      }
  ]
});
