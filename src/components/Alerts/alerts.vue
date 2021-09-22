<template>
  <div class="row">
    <div class="col-2 my-auto text-center" v-if="type === 'error'">
      <i class="bi-x-circle alert-icon" style="color: #cc3300;" />
    </div>
    <div class="col-2 my-auto text-center" v-if="type === 'info'">
      <i class="bi-exclamation-circle alert-icon" style="color: #4bb1cf;" />
    </div>
    <div class="col-2 my-auto text-center" v-if="type === 'warning'">
      <i class="bi-exclamation-triangle alert-icon" style="color: #ffcc00;" />
    </div>
    <div class="col-2 my-auto text-center" v-if="type === 'success'">
      <i class="bi-check2-circle alert-icon" style="color: #1db231;" />
    </div>
    <div class="col-10" style="padding: 0rem 0.5rem">
      <div class="row">
        <div class="col-12"><h5 style="margin-bottom: 0.05rem">{{ header }}</h5></div>
        <div class="col-12">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "alerts",
  props: {
    header: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info"
    }
  }
};
</script>

<style scoped>
.alert-icon {
  font-size: 2rem;
}
</style>
