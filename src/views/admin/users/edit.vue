<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">{{ user.id ? `Edit User: ${user.username}` : 'New User' }}</h3></div><div></div></div></div></div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">User Settings</h4></div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Username</h5>
          </div>
          <div class="col-md-9">
            <input type="text" class="form-control" placeholder="Username" v-model="user.username">
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2" v-if="!!!user.id">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Password</h5>
          </div>
          <div class="col-md-9">
            <input type="text" class="form-control" placeholder="Password" v-model="user.password">
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Avatar</h5>
          </div>
          <div class="col-md-9">
            <div class="d-flex align-items-center">
              <div class="me-3">
                <img :src="getAvatar()" class="rounded-circle avatar avatar-lg" alt="">
              </div>
              <div>
                <button class="btn btn-outline-white me-1" @click="show = true">Change</button>
                <button type="submit" class="btn btn-outline-white">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Role</h5>
          </div>
          <div class="col-md-9">
            <div class="form-check  mb-2">
              <input type="checkbox" class="form-check-input" v-model="user.isAdmin">
              <label class="form-check-label">Is Admin</label>
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
    <avatarUpload v-if="show" @upload="upload" @close="show = false"></avatarUpload>
  </div>
</template>

<script>
import { User } from "../../../models"
import avatarUpload from "../../userprofile/components/avatarUpload";

export default {
  name: "edit",
  data() {
    return {
      show: false,
      avatarImg: '',
      defaultImg: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwNkQyMjgzOUNEOTExRUE4RThBRkNGQzc1NzY0M0ExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwNkQyMjg0OUNEOTExRUE4RThBRkNGQzc1NzY0M0ExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjA2RDIyODE5Q0Q5MTFFQThFOEFGQ0ZDNzU3NjQzQTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjA2RDIyODI5Q0Q5MTFFQThFOEFGQ0ZDNzU3NjQzQTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwICAwQFBAQEBAQFBgUFBQUFBQYGBwcIBwcGCQkKCgkJDAwMDAwMDAwMDAwMDAwMAQMDAwUEBQkGBgkNCwkLDQ8ODg4ODw8MDAwMDA8PDAwMDAwMDwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABoAGgDAREAAhEBAxEB/8QAbQABAQACAwEAAAAAAAAAAAAAAAkECAIFBgcBAQAAAAAAAAAAAAAAAAAAAAAQAAEDBAEDAgQEBwAAAAAAAAABAgMEBQYHERITCCExQTIUCVFhFhdxIlJjJBUmEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4SSRxRvlle2OKNqukkcqI1rUTlVVV9EREAnHoXzE/cryWz7Ca2s/wCKydVg1b1eiMfaWvR3w5/zY0fN6r6K1Gp7gYfnJtTyI0nfMYybXmdvtWAZNCtDLQLa7VVJSXSBFere9U0ksipPF/M1FcvCsf8ADhAN4dQbGt+1tZYdsKhVkceQ22Oeuga5FbT1cfMdXDz/AGpmPbyv4cgTRxzyX35u/wAoKnA9WZ4tj1pLepO2kFstVWkFjt3Sypq0nqKSaRVqEYrmdT1Trka1PThAK8AAAAAAAAANJvOzdH7W6fqsetNZ2Mt2T3bRbO27iWCh6U+vqU4VHJxG5IkVPZ0iL8AJX5JhuKav1Zo7a2BbIx+v2tS3Fblllltt3pKquo5JnNqrarqWOd0jPp2xduZOn538L+YWCvVHjfmH4y9dH2oJMztLaq2qq9X+tvtIq8McqLzxFUMWN39TFX4OAlnqPyOvOmNIb107dXTW7LmSvp8NpXq5JaSrrJPoLtH1ojmsdTtTusTn1f1fxQN4Pt36Y/Rmua3aN5pO3kGx+EtPWnD4bNA5e1x8U+okRZF/FqRqBRMAAAAAAAABFbbuutw+UflJSUt2wLMMW1nTV7bJbshuForaKlprLROc+pqmTVMPZSSpVJHx8/Mro2r7Affcl+2hqhuPXt+KZZmH6mZQzusDblV2+SkdWNYqwtnbFb4nqxz+Ed0vReAPMfb8ft7Xt3ybWOe62y/H8UvaOu1iu9zs1fTUdLcYWoyeJ08sLY2pURNRUVV46mIierwOq8mvEa5Zr5O4TcsepZYsU21Ud3Ma6Fq9NvmtzGur5FdwqNWenajo+r5pepAKuW630Vpt9BarbTMo7dbKeKkoKSJOlkUMLEjjY1E9ka1ERAMwAAAAAAAAAAAAHCLxynt7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k='
    }
  },
  components: {
    avatarUpload
  },
  computed: {
    user() {
      if (this.$route.params.id) {
        return this.$store.getters["User/byId"](this.$route.params.id);
      }
      return new User();
    }
  },
  mounted() {
    this.$store.dispatch("User/all");
  },
  methods: {
    getAvatar() {
      if (this.user.image) {
        return this.user.image.replace('dataimage/pngbase64', 'data:image/png;base64,');
      }
      return this.defaultImg;
    },
    send() {
      this.user.update().then(() => {
        this.$store.dispatch("Alerts/alert",  { type: 'success', title: 'Update User',
          message: 'User successfully Edit/Updated' });
        this.$router.go(-1);
      });
    },
    upload(base64) {
      this.show = false;
      this.user.image = base64;
    }
  }
}
</script>

<style scoped>

</style>
