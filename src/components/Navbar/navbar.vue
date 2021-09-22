<template>
  <div class="header @@classList">
    <!-- navbar -->
    <nav class="navbar-classic navbar navbar-expand-lg">
      <a id="nav-toggle" @click="updateSidebar" style="cursor: pointer"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-menu nav-icon me-2 icon-xs"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line></svg
      ></a>
      <!--Navbar nav -->
      <ul
        class="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap"
        v-if="isLoggedIn"
      >
        <!-- List -->
        <li class="dropdown ms-2">
          <a
            class="rounded-circle"
            role="button"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="avatar avatar-md">
              <img
                alt="avatar"
                src="../../assets/images/avatar/avatar.jpg"
                class="rounded-circle"
              />
            </div>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownUser"
          >
            <div class="px-4 pb-0 pt-2">
              <div class="lh-1">
                <h5 class="mb-1">{{ currentUser.username }}</h5>
                <router-link :to="{ name: 'UserShow' }">
                  <a class="text-inherit fs-6">View my profile</a>
                </router-link>
              </div>
              <div class="dropdown-divider mt-3 mb-2"></div>
            </div>

            <ul class="list-unstyled">
              <li>
                <a class="dropdown-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="
                      feather feather-settings
                      me-2
                      icon-xxs
                      dropdown-item-icon
                    "
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path
                      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                    ></path></svg
                  >Account Settings
                </a>
              </li>
              <li>
                <a class="dropdown-item" @click="logout">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="
                      feather feather-power
                      me-2
                      icon-xxs
                      dropdown-item-icon
                    "
                  >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line></svg
                  >Sign Out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar.vue",
  computed: {
    ...mapGetters({
      isLoggedIn: "Login/isLoggedIn",
      currentUser: "Login/data"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("Login/logout");
      this.$router.push({ name: "login" });
    },
    updateSidebar() {
      this.$store.dispatch("Sidebar/changeToggel");
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 3.5rem;
}
</style>
