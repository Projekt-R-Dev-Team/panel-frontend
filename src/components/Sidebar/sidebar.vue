<template>
  <nav class="navbar-vertical navbar">
    <div
      class="slimScrollDiv"
      style="position: relative; overflow: hidden; width: auto; height: 100%"
    >
      <div
        class="nav-scroller"
        style="overflow: hidden; width: auto; height: 100%"
      >
        <!-- Brand logo -->
        <a class="navbar-brand"> </a>
        <ul class="navbar-nav flex-column" id="sideNavbar">
          <li class="nav-item">
            <router-link :to="{ name: 'Dashboard' }">
              <a class="nav-link has-arrow">
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
                  class="feather feather-home nav-icon icon-xs me-2"
                >
                  <path
                    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  ></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Dashboard
              </a>
            </router-link>
          </li>

          <!-- Nav header -->
          <li class="nav-item">
            <div class="navbar-heading">Server-Panel</div>
          </li>

          <!-- Nav item -->
          <ul class="navbar-nav flex-column">
            <router-link :to="{ name: 'ServerList' }">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-server" />
                  Server
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'Groups' }">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-collection" />
                  Groups
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'News' }">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-newspaper"></i>
                  News
                </a>
              </li>
            </router-link>
          </ul>

          <!-- Admin header -->
          <li class="nav-item" v-if="currentUser.isAdmin === 1">
            <div class="navbar-heading">Admin Pages</div>
          </li>
          <!-- Nav item -->
          <ul class="navbar-nav flex-column" v-if="currentUser.isAdmin === 1">
            <router-link :to="{ name: 'GroupsAdmin'}">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-collection" />
                  Groups
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'NewsAdmin'}">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-newspaper" />
                  News
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'ServersAdmin'}">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-server" />
                  Servers
                </a>
              </li>
            </router-link>
            <router-link :to="{ name: 'UsersAdmin'}">
              <li class="nav-item">
                <a class="nav-link">
                  <i class="nav-icon icon-xs me-2 bi bi-people-fill" />
                  Users
                </a>
              </li>
            </router-link>
          </ul>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "sidebar",
  computed: {
    ...mapGetters({
      currentUser: "Login/data"
    })
  }
};
</script>

<style scoped></style>
