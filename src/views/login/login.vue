<template>
  <div class="h-100 shapebackground">
    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center g-0
        min-vh-100">
        <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0" style="
    margin-bottom: 17rem">
          <!-- Card -->
          <div class="card smooth-shadow-md">
            <!-- Card body -->
            <div class="card-body p-6">
              <div class="mb-4 text-center">
                <img src="../../assets/images/server-logo.png">
              </div>
                <!-- Username -->
                <div class="mb-3">
                  <label class="form-label">Username or email</label>
                  <input class="form-control" placeholder="Email address here" required="" v-model="username">
                </div>
                <!-- Password -->
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" name="password" placeholder="***********" required="" v-model="password">
                </div>
                <div>
                  <!-- Button -->
                  <div class="d-grid">
                    <button class="btn btn-primary" @click="login">Sign
                      in</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch("Login/login", {
        username: this.username,
        password: this.password
      })
      .then(() => {
        this.$router.push({ name: "Dashboard"});
      });
    }
  }
};
</script>

<style>
.shapebackground:before {
  content: '';
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #624BFF, #624BFF);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: -10;
}
</style>
