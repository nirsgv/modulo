<template>
  <div class="hello">
    <div class="selector">
      {{ patterns[patternUid] }}
      {{ layers }}
    </div>
    <v-select label="Select" :items="Object.keys(patterns)"></v-select>
    <button @click="savePattern">save</button>

    <div
      v-for="(layer, layerIdx) in layers"
      :key="layerIdx"
      class="layers"
      :class="{ selected: selectedLayer === layer }"
    >
      <button @click="(e) => (selectedLayer = layer)">select</button>
      <button
        type="checkbox"
        v-for="(item, boxIndex) in Array.from({ length: barLength })"
        :key="boxIndex"
        :class="{ highlighted: pointer % barLength === boxIndex }"
        :checked="!grid[layer] ? false : grid[layer][`box-${boxIndex}`]"
        @click="toggleBox({ layer, boxIndex })"
      >
        {{ boxIndex }}
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
    this.patternUid = uuidv4();
    this.createEmptyPattern({ uid: this.patternUid });
    this.savePattern(this.grid, this.patternUid);
  },
  data: function () {
    return {
      grid: {},
      selectedLayer: "a",
      layers: [new Channel()],
      patternUid: null,
    };
  },
  computed: {
    ...mapGetters("timeline", ["pointer", "barLength"]),
    ...mapGetters("patterns", ["patterns"]),
  },
  methods: {
    ...mapActions("patterns", ["createEmptyPattern", "savePattern"]),
    toggleBox: function ({ layer, boxIndex }) {
      const newGrid = { ...this.grid };
      if (!newGrid[layer.uid]) newGrid[layer.uid] = {};
      if (newGrid[layer.uid][`box-${boxIndex}`]) {
        newGrid[layer.uid][`box-${boxIndex}`] = false;
      } else {
        newGrid[layer.uid][`box-${boxIndex}`] = true;
      }
      this.grid = newGrid;
      this.savePattern({ pattern: this.grid, uid: this.patternUid });
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
.selected {
  outline: 1px solid #ddd;
}
</style>
