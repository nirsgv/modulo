<template>
  <div class="home">
    <Timeline msg="Welcome to Your Vue.js App" />
    <GridBox />
  </div>
</template>

<script>
import { GridBox, Timeline } from "@/components/index.js";

export default {
  name: "Home",
  components: {
    Timeline,
    GridBox,
  },
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 80%;
  margin: 0 auto;
}

</style>
