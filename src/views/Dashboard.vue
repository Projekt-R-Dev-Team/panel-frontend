<template>
  <div class="home">
    <div class="bg-primary pt-10 pb-21"></div>
    <div class="container-fluid mt-n22 px-6">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="mb-2 mb-lg-0">
                <h3 class="mb-0 fw-bold text-white">Server</h3>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-6">
          <div class="card rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 class="mb-0">Servers</h4>
                </div>
                <router-link :to="{ name : 'ServerList' }">
                  <div class="icon-shape icon-md bg-light-primary text-primary rounded-1">
                    <i class="bi bi-server fs-4"></i>
                  </div>
                </router-link>
              </div>
              <div>
                <h1 class="fw-bold">{{ server.length || 0}}</h1>
                <router-link :to="{ name : 'ServerList' }">
                  <p class="mb-0">Show Server List</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-6">
          <div class="card rounded-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 class="mb-0">Groups</h4>
                </div>
                <router-link :to="{ name : 'Groups' }">
                  <div class="icon-shape icon-md bg-light-primary text-primary  rounded-1">
                    <i class="bi bi-collection fs-4"></i>
                  </div>
                </router-link>
              </div>
              <div>
                <h1 class="fw-bold">{{ groups.length || 0 }}</h1>
                <router-link :to="{ name : 'Groups' }">
                  <p class="mb-0">Show your Groups</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-6">
        <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">News</h3></div><div></div></div></div></div>
        <div v-for="news in news" :key="news.id" class="col-xl-6 col-sm-12 d-flex">
          <div class="card mb-5 flex-grow-1" style="max-height: 11rem;">
            <div class="card-header bg-white border-bottom-0 py-4">
              <h4 class="mb-0">{{ news.title }}</h4>
            </div>
            <div class="card-body block-truncate" style="margin-top: -2rem;">
              {{ news.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
name: "Dashboard",
  mounted() {
    this.$store.dispatch("News/all");
  },
  computed: {
    ...mapGetters({
      server : "Server/all",
      news: "News/active",
      groups: "Groups/all"
    }),
    news() {
      let _news = this.$store.getters["News/all"];
      if (_news.length > 4) {
        return _news.splice(0, 4);
      }
      return _news;
    }
  }
};
</script>
<style>
.block-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
