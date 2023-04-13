<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </v-app>
</template>
<script>
import { WebMidi } from "webmidi";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  mounted() {
    const onEnabled = () => {
      this.initMidiInterface();
      this.initTimer();
      console.log({ WebMidi });
    };
    WebMidi.enable()
      .then(onEnabled)
      .catch((err) => alert(err));
  },
  computed: {
    ...mapGetters("timeline", ["bpm"]),
  },
  methods: {
    ...mapActions("timeline", ["setBpm", "initTimer"]),
    ...mapActions("physical_interface", ["initMidiInterface"]),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
