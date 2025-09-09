<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">Server List</h3></div><div></div></div></div></div>
    </div>
    <div v-for="server in servers" :key="server.id">
      <router-link :to="{ name: 'ServerDetail', params: { id: server.id }}">
        <server_card :server="server"></server_card>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import server_card from "./components/server_card";

export default {
  name: "list",
  components: {
    server_card
  },
  computed: {
    ...mapGetters({
      servers: "Server/all"
    })
  }
}
</script>

<style scoped>

</style>
