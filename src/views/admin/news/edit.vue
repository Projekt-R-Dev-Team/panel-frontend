<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">{{ news.id ? `Edit News: ${news.title}` : 'New News' }}</h3></div><div></div></div></div></div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">News Settings</h4></div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Title</h5>
          </div>
          <div class="col-md-9">
            <input type="text" class="form-control" placeholder="News Title" v-model="news.title">
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Content</h5>
          </div>
          <div class="col-md-9">
            <textarea class="form-control" placeholder="News Content" v-model="news.message"></textarea>
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-1">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Role</h5>
          </div>
          <div class="col-md-9">
            <div class="form-check  mb-2">
              <input type="checkbox" class="form-check-input" v-model="news.active">
              <label class="form-check-label">Active</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-body">
        <div class="row justify-content-between">
          <button class="btn btn-danger w-25"  @click="$router.go(-1)">Back</button>
          <button class="btn btn-success w-25" @click="send">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {News} from "../../../models";

export default {
  name: "edit",
  computed: {
    news() {
      if (this.$route.params.id) {
        return this.$store.getters["News/byId"](this.$route.params.id);
      }
      return new News();
    }
  },
  mounted() {
    this.$store.dispatch("News/all");
  },
  methods: {
    send() {
      this.news.update().then(() => {
        this.$store.dispatch("Alerts/alert",  { type: 'success', title: 'News Updated', message: 'News successfully Edit/Updated' });
        this.$router.go(-1);
      })
    }
  }
}
</script>

<style scoped>

</style>
