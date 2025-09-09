<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5">
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">Server Admin</h3>
            </div>
            <div>
              <router-link :to="{ name : 'ServersAdminEdit'}">
               <a href="#" class="btn btn-white">Create New Server <i class="bi bi-plus"></i></a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AdminList :map-data="{
      id : {
        name: 'Id'
      },
      name : {
        name : 'Name'
      },
      type : {
        name : 'Type'
      }
    }" title="Servers" :list-data="servers" :edit="true" @editBtn="edit">
    </AdminList>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import List from "../../../components/List/AdminList/List";

export default {
  name: "show",
  components: {
    AdminList : List
  },
  computed: {
    ...mapGetters({
      servers : "Server/admin"
    })
  },
  mounted() {
    this.$store.dispatch("Server/admin");
  },
  methods: {
    edit(event) {
      this.$router.push({ name : 'ServersAdminEdit', params: { id: event }});
    }
  }
}
</script>

<style scoped>

</style>
