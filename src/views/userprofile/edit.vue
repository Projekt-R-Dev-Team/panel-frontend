<template>
  <div class="container-fluid px-6 py-4">
    <!-- Header Settings -->
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <div>
          <div class="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">General</h3>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Avatar Settings -->
    <div class="row mb-8">
      <div class="col-xl-3 col-lg-4 col-md-12 col-12">
        <div class="mb-4 mb-lg-0">
          <h4 class="mb-1">General Setting</h4>
          <p class="mb-0 fs-5 text-muted">Profile configuration settings </p>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-12 col-12">
        <div class="card">
          <div class="card-body">
            <div class=" mb-6">
              <h4 class="mb-1">General Settings</h4>
            </div>
            <div class="row align-items-center mb-8">
              <div class="col-md-3 mb-3 mb-md-0">
                <h5 class="mb-0">Avatar</h5>
              </div>
              <div class="col-md-9">
                <div class="d-flex align-items-center">
                  <div class="me-3">
                    <img :src="getAvatar" class="rounded-circle avatar avatar-lg" alt="">
                  </div>
                  <div>
                    <button class="btn btn-outline-white me-1" @click="show = true">Change</button>
                    <button type="submit" class="btn btn-outline-white">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-8">
              <div class="col-md-3 mb-3 mb-md-0">
                <h5 class="mb-0">Cover photo</h5>
              </div>
              <div class="col-md-9">
                <div>
                  <form action="#" class="dropzone mb-3 border-dashed dz-clickable">
                    <div class="dz-default dz-message"><button class="dz-button" type="button">Drop files here to upload</button></div></form>
                  <button type="submit" class="btn btn-outline-white">Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- Password Settings -->
    <div class="row mb-8">
      <div class="col-xl-3 col-lg-4 col-md-12 col-12">
        <div class="mb-4 mb-lg-0">
          <h4 class="mb-1">Password Setting</h4>
          <p class="mb-0 fs-5 text-muted">Change Password </p>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-12 col-12">
        <div class="card" id="edit">
          <div class="card-body">
            <div class="mb-6 mt-6">
              <h4 class="mb-1">Change your password</h4>
            </div>
            <form>
              <div class="mb-3 row">
                <label for="currentPassword" class="col-sm-4 col-form-label form-label">Current password</label>

                <div class="col-md-8 col-12">
                  <input type="password" class="form-control" placeholder="Enter Current password" id="currentPassword" required="">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="currentNewPassword" class="col-sm-4 col-form-label form-label">New password</label>
                <div class="col-md-8 col-12">
                  <input type="password" class="form-control" placeholder="Enter New password" id="currentNewPassword" required="">
                </div>
              </div>
              <div class="row align-items-center">
                <label for="confirmNewpassword" class="col-sm-4 col-form-label form-label">Confirm new password</label>
                <div class="col-md-8 col-12 mb-2 mb-lg-0">
                  <input type="password" class="form-control" placeholder="Confirm new password" id="confirmNewpassword" required="">
                </div>
                <div class="offset-md-4 col-md-8 col-12 mt-4">
                  <h6 class="mb-1">Password requirements:</h6>
                  <p>Ensure that these requirements are met:</p>
                  <ul>
                    <li> Minimum 8 characters long the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one uppercase character</li>
                    <li>At least one number, symbol, or whitespace character
                    </li>
                  </ul>
                  <button type="submit" class="btn btn-primary">Save
                    Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <avatarUpload v-if="show" @close="show = false" @upload="upload"></avatarUpload>
  </div>
</template>
<script>
import avatarUpload from "./components/avatarUpload";
import {mapGetters} from "vuex";
import {User} from '../../models';

export default {
  name: "edit",
  data() {
    return {
      show: false,
      avatarImg: ''
    }
  },
  components: {
    avatarUpload
  },
  computed: {
    ...mapGetters({
      avatar: "Login/avatar",
      currentUser: "Login/data"
    }),
    getAvatar() {
      if (this.avatar) {
        return this.avatar.replace('dataimage/pngbase64', 'data:image/png;base64,');
      }
      return '../../assets/images/avatar/avatar.jpg'
    }
  },
  methods: {
    upload(base64) {
      this.show = false;

      let user = new User({ id: this.currentUser.id, username: this.currentUser.username})

      user.image = base64;
      user.update().then(() => {
        this.$store.dispatch("Login/setAvatar", base64);
        this.$emit('success');
        this.$store.dispatch("Alerts/alert", {
          type: 'success',
          title: 'Change Profile Picture',
          message: 'Success Your profile picture has been updated'
        });
      })
    }
  }
}
</script>

<style>

</style>
