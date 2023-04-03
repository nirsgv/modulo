<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Timeline msg="Welcome to Your Vue.js App" />
    <GridBox />
  </div>
</template>

<script>
// @ is an alias to /src
import Timeline from "@/components/timeline/Timeline";
import GridBox from "@/components/gridBox/GridBox";

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
  max-width: 50%;
  margin: 0 auto;
}
</style>
