<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <div>
          <div class="border-bottom pb-4 mb-4">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">Overview</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-xl-12 col-lg-12 col-md-12 col-12">
        <!-- Bg -->
        <div class="pt-20 rounded-top user-background"></div>
        <div class="bg-white rounded-bottom smooth-shadow-sm">
          <div
            class="d-flex align-items-center justify-content-between pt-4 pb-6 px-4 ">
            <div class="d-flex align-items-center">
              <!-- avatar -->
              <div
                class="avatar-xxl me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                <img :src="getAvatar" class="avatar-xxl rounded-circle border border-4 border-white-color-40"/>
              </div>
              <!-- text -->
              <div class="lh-1">
                <h2 class="mb-0">{{ currentUser.username }}</h2>
              </div>
            </div>
            <div>
              <router-link :to="{ name: 'UserEdit' }">
                <a class="btn btn-outline-primary d-none d-md-block"
                >Edit Profile</a
                >
              </router-link>
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
  name: "userShow",
  computed: {
    ...mapGetters({
      currentUser: "Login/data",
      avatar: "Login/avatar"
    }),
    getAvatar() {
      if (this.avatar) {
        return this.avatar.replace('dataimage/pngbase64', 'data:image/png;base64,');
      }
      return '../../assets/images/avatar/avatar.jpg'
    }
  }
};
</script>

<style scoped>
.user-background {
  background: url(../../assets/images/background/profile-cover.jpg) no-repeat;
  background-size: cover;
}
</style>
