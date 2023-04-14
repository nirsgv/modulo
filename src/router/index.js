import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MidiSetup from "../views/MidiSetup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/midi_setup",
    name: "MidiSetup",
    component: MidiSetup,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
