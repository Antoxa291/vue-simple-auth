<template>
  <div class="alert">
    <v-alert class="mx-0 my-0" v-bind="$props" elevation="10" prominent origin>
      <span v-html="message"></span>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertLayout",
  props: {
    color: { type: String, default: "red" },
    icon: { type: String },
    type: { type: String, default: "warning" },
    transition: { type: String },
    message: { type: String },
    border: { type: String, default: "left" },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  right: 10px;
  top: 10px;
  width: auto;
  z-index: 9999999999;
}
</style>
