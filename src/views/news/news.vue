<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">News</h3></div><div></div></div></div></div>
      <div class="col-6" v-for="news in news" :key="news.id">
        <div class="card mb-5">
          <div class="card-header bg-white border-bottom-0 py-4">
            <h4 class="mb-0">{{ news.title }}</h4>
          </div>
          <div class="card-body">
            {{ news.message }} {{ news.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "news",
  computed: {
    ...mapGetters({
      news: "News/active"
    })
  },
  mounted() {
    this.$store.dispatch("News/all");
  }
}
</script>

<style scoped>

</style>
