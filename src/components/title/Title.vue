<template>
  <div class="title">
    <slot name="content" v-if="!editing">
      <h1>{{ title }}</h1>
    </slot>
    <slot name="edit" v-else>
      <input
        type="text"
        :value="title"
        @change="(e) => $emit('change_title', { val: e.target.value })"
      />
    </slot>
  </div>
</template>

<script>
export default {
  name: "Title",
  components: {},
  props: {
    title: String,
    editing: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss"></style>
