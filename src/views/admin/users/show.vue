<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5">
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">User Admin</h3>
            </div>
            <div>
              <router-link :to="{ name : 'UsersAdminEdit' }">
                <a href="#" class="btn btn-white">Create New User <i class="bi bi-plus"></i></a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AdminList :map-data="{
      id : {
        name : 'Id'
      },
      username : {
        name: 'Username'
      },
      image : {
        name: 'Profile Picture',
        image: true
      },
      isAdmin : {
        name: 'Role'
      }
    }" title="Users" :list-data="users" :edit="true" @editBtn="edit">
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
      users : "User/all"
    })
  },
  mounted() {
    this.$store.dispatch("User/all");
  },
  methods: {
    edit(event) {
      this.$router.push({ name : 'UsersAdminEdit', params: { id: event }});
    }
  }
}
</script>

<style scoped>

</style>
