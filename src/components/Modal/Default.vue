<template>
  <div>
    <div class="modal-backdrop fade show"></div>
    <div class="modal">
      <div :class="modalSize">
        <div class="modal-content">
          <div class="modal-header" v-if="title">
            <h5 class="modal-title h4">{{ title }}</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Default.vue",
  props: {
    title: String,
    size: {
      type : Number,
      default : 0
    }
  },
  computed: {
    modalSize() {
      return {
        'modal-dialog': true,
        'modal-sm': this.size === 0,
        'modal-lg': this.size === 1,
        'modal-xl': this.size === 2
      }
    }
  }
}
</script>

<style scoped>
.modal {
  display: unset !important;
}
</style>
