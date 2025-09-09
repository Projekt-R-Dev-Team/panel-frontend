<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5">
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">News Admin</h3>
            </div>
            <div>
              <router-link :to="{ name : 'NewsAdminEdit'}">
                <a href="#" class="btn btn-white">Create New News <i class="bi bi-plus"></i></a>
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
      title : {
        name : 'Title'
      },
      active : {
        name : 'Active'
      }
    }" title="News" :list-data="news" :edit="true" @editBtn="edit"></AdminList>
  </div>
</template>

<script>
import List from "../../../components/List/AdminList/List";
import {mapGetters} from "vuex";

export default {
  name: "show",
  components: {
    AdminList : List
  },
  computed: {
    ...mapGetters({
      news : "News/all"
    })
  },
  mounted() {
    this.$store.dispatch("News/all");
  },
  methods: {
    edit(event) {
      this.$router.push({ name : 'NewsAdminEdit', params: { id: event }});
    }
  }
}
</script>

<style scoped>

</style>
