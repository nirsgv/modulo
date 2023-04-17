<template>
  <div class="hello">
    <Title
      :title="pattern.name"
      :editing="true"
      @change_title="({ val }) => changePatternTitle({ val })"
    />
    <div class="selector">
      <button @click="copyPattern">copy</button>
      <button @click="pastePattern">paste</button>
      <h6>
        {{ patterns }}
      </h6>
      <v-select
        label="Select"
        :items="Object.values(patterns)"
        item-text="name"
        item-value="uid"
        return-object
        @change="setSelectedPattern"
      />
    </div>
    <button @click="createNewPattern">save new</button>

    <div
      v-for="(track, trackIdx) in pattern.tracks"
      :key="trackIdx"
      class="layers"
      :class="{ selected: selectedLayer === track.uid }"
    >
      <!-- <button class="track-name ellipsis">{{ track.name }}</button> -->
      <button class="track-name ellipsis">
        <Title
          :title="track.name"
          :editing="true"
          @change_title="({ val }) => changeTrackTitle({ val, trackUid: track.uid })"
        >
          <template #content>
            <button class="track-name ellipsis">{{ track.name }}</button>
          </template>
        </Title>
      </button>

      <button @click="removeTrack({ trackUid: track.uid })">remove</button>
      <button @click="(e) => (selectedLayer = track.uid)">select</button>

      <button
        type="checkbox"
        v-for="(item, bIdx) in Array.from({ length: barLength })"
        :key="`layerIdx-${trackIdx}-bIdx-${bIdx}`"
        :class="{ highlighted: pointer % barLength === bIdx }"
        :checked="
          !pattern[track.uid]?.noteEvents
            ? false
            : pattern[track.uid]?.noteEvents[`b-${bIdx}`]
        "
        @click="
          toggleBox({
            channelUid: track.uid,
            patternUid: selectedPatternUid,
            bIdx,
          })
        "
      >
        {{ bIdx }}
      </button>
    </div>
    <button @click="addTrack">Add track</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { Title } from "@/components/index.js";

export default {
  name: "GridBox",
  components: { Title },
  created() {
    this.createNewPattern();
  },
  data: function () {
    return {
      selectedLayer: "a",
      patternUid: null,
    };
  },
  computed: {
    ...mapGetters("timeline", ["pointer", "barLength"]),
    ...mapGetters("patterns", [
      "patterns",
      "patternNames",
      "pattern",
      "selectedPatternUid",
    ]),
  },
  methods: {
    ...mapActions("patterns", [
      "createEmptyPattern",
      "savePattern",
      "setSelectedPattern",
      "toggleBox",
      "addTrack",
      "removeTrack",
      "copyPattern",
      "pastePattern",
      "changePatternTitle",
      "changeTrackTitle",
    ]),
    createNewPattern() {
      this.patternUid = uuidv4();
      this.createEmptyPattern({ uid: this.patternUid });
      this.savePattern({ pattern: null, uid: this.patternUid });
      this.setSelectedPattern({ uid: this.patternUid });
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
button {
  width: 20px;
  height: 40px;
  margin: 0;
  outline: 1px solid #ccc;
  font-size: 10px;
  color: #aaa;
  padding: 0 4px;
}
.track-name {
  width: 60px;
}
.selected {
  outline: 1px solid #ddd;
}
</style>
