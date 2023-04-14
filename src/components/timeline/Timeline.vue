<template>
  <div class="hello">
    <h1>{{ pointer }}</h1>
    <h1>{{ pointer % barLength }}</h1>
    <h1 @click="toggleRun">{{ isRunning }}</h1>
    <h4>{{ timerID }}</h4>
    <input type="number" :value="bpm" @change="startTimer" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Timeline",
  components: {},
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters("timeline", [
      "bpm",
      "pointer",
      "isRunning",
      "timerID",
      "barLength",
    ]),
  },
  methods: {
    ...mapActions("timeline", [
      "init",
      "setBpm",
      "toggleRunning",
      "stopRunning",
      "startRunning",
    ]),
    startTimer(e) {
      this.stopRunning();
      this.setBpm({
        bpm: Number(e.target.value),
        interval: this.timerID,
      });
      this.startRunning();
    },
    toggleRun() {
      this.isRunning ? this.stopRunning() : this.startRunning();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
