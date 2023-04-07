<template>
  <div class="hello">
    <div class="selector">
      <div>
        {{ patterns }}
      </div>
      <div :style="{ color: 'blue' }">
        {{ pattern }}
      </div>

      <v-select
        label="Select"
        :items="Object.keys(patterns)"
        @change="() => setSelectedPattern({ uid: this.patternUid })"
      />
    </div>
    <button @click="createNewPattern">save new</button>

    <div
      v-for="(layer, layerIdx) in layers"
      :key="layerIdx"
      class="layers"
      :class="{ selected: selectedLayer === layer.uid }"
    >
      <button @click="(e) => (selectedLayer = layer.uid)">select</button>
      <button
        type="checkbox"
        v-for="(item, bIdx) in Array.from({ length: barLength })"
        :key="`layerIdx-${layerIdx}-bIdx-${bIdx}`"
        :class="{ highlighted: pointer % barLength === bIdx }"
        :checked="!pattern[layer.uid] ? false : pattern[layer.uid][`b-${bIdx}`]"
        @click="toggleBox({ uid: layer.uid, bIdx })"
      >
        {{ bIdx }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { Channel } from "../../helpers/index.js";

export default {
  name: "GridBox",
  components: {},
  props: {
    patternId: {
      type: String,
    },
  },
  created() {
    this.createNewPattern();
  },
  data: function () {
    return {
      grid: {},
      selectedLayer: "a",
      layers: [new Channel(), new Channel(), new Channel()],
      patternUid: null,
    };
  },
  computed: {
    ...mapGetters("timeline", ["pointer", "barLength"]),
    ...mapGetters("patterns", ["patterns", "pattern"]),
  },
  methods: {
    ...mapActions("patterns", [
      "createEmptyPattern",
      "savePattern",
      "setSelectedPattern",
    ]),
    toggleBox: function ({ uid, bIdx }) {
      const cPattern = { ...this.pattern };
      if (!cPattern[uid]) cPattern[uid] = {};
      if (cPattern[uid][`b-${bIdx}`]) {
        cPattern[uid][`b-${bIdx}`] = false;
      } else {
        cPattern[uid][`b-${bIdx}`] = true;
      }
      this.grid = cPattern;
      this.savePattern({ pattern: this.grid, uid: this.patternUid });
    },
    createNewPattern() {
      this.patternUid = uuidv4();
      this.createEmptyPattern({ uid: this.patternUid });
      this.savePattern({ pattern: {}, uid: this.patternUid });
      this.setSelectedPattern({ uid: this.patternUid });
    },
    addChannel: function () {
      return { ...this.grid, a: new Channel({ uid: uuidv4() }) };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button[checked="checked"] {
  background: rgb(45, 45, 45);
  color: white;
}
.highlighted {
  background: rgb(65, 65, 65);
}
ul {
  list-style-type: none;
  padding: 0;
}
.layers {
}
button {
  width: 20px;
  height: 40px;
  margin: 0;
  outline: 1px solid #ccc;
  font-size: 10px;
  color: #aaa;
}
.selected {
  outline: 1px solid #ddd;
}
</style>
