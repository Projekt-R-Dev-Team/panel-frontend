<template>
  <div class="webapp-layout">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter">
    <navbar></navbar>
    <div class="page-content">
      <div class="sidebar">
        <!-- Sidebar -->
      </div>
      <router-view class="app"></router-view>
    </div>
    <!-- Alerts -->
  </div>
</template>

<script>
import navbar from "./components/Navbar/navbar";
import { mapGetters } from 'vuex';
import {doOnStartActions} from "./store/utils";

export default {
  name: "App",
  components: {
    navbar
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "Login/isLoggedIn"
    })
  },
  watch: {
    isLoggedIn: function (val) {
      if (val) {
        doOnStartActions(this.$store);
      }
    }
  }
};
</script>
<style>
.webapp-layout {
  height: 100%;
}

html,body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
