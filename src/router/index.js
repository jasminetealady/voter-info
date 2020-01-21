import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dates',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dates.vue'),
  },
  {
    path: '/contests',
    name: 'contests',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contests.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
