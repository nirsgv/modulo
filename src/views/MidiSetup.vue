<template>
  <div class="midi-setup">
    <div>{{ inputs }}</div>
    <div>{{ outputs }}</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GridBox",
  data: function () {
    return {
      selectedLayer: "a",
      patternUid: null,
    };
  },
  computed: {
    ...mapGetters("midi_setup", ["inputs", "outputs"]),
  },
  methods: {
    ...mapActions("patterns", ["changePatternTitle"]),
  },
};
</script>
