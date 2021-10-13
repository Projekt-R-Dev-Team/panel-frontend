<template>
  <div id="db-wrapper" :class="{ toggled: sidebar }">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Inter"
    />
    <sidebar v-if="isLoggedIn"></sidebar>
    <div id="page-content">
      <navbar></navbar>
      <router-view class="app"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { doOnStartActions } from "./store/utils";

import navbar from "./components/Navbar/navbar";
import sidebar from "./components/Sidebar/sidebar";


export default {
  name: "App",
  components: {
    navbar,
    sidebar
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "Login/isLoggedIn",
      sidebar: "Sidebar/isToggel"
    })
  },
  watch: {
    isLoggedIn: function (val) {
      if (val) {
        doOnStartActions(this.$store);
      }
    }
  },
  created() {
    if (this.isLoggedIn) {
      doOnStartActions(this.$store);
    }
  }
};
</script>
<style>
.webapp-layout {
  height: 100%;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
}

.text-primary {
  color: #624BFF !important
}
</style>
