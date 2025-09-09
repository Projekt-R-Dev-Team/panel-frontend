<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">{{ server.id ? `Edit Server: ${server.name}` : 'New Server' }}</h3></div><div></div></div></div></div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">News Settings</h4></div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Name</h5>
          </div>
          <div class="col-md-9">
            <input type="text" class="form-control" placeholder="Username" v-model="server.name">
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Information</h5>
          </div>
          <div class="col-md-9">
            <textarea class="form-control" placeholder="News Content" v-model="server.information"></textarea>
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Type</h5>
          </div>
          <div class="col-md-9">
            <form>
              <select class="form-select"  required>
                <option value="" disabled selected hidden>Select server type</option>
                <option value="0">Minecraft</option>
                <option value="1">Arma 3</option>
                <option value="1">Garys Mod</option>
              </select>
            </form>
          </div>
        </div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Image</h5>
          </div>
          <div class="col-md-9">
            <div class="d-flex align-items-center">
              <div class="me-3">
                <img :src="getImage()" style="width: 7rem; height: 4rem" alt="">
              </div>
              <div>
                <button class="btn btn-outline-white me-1" @click="show = true">Change</button>
                <button type="submit" class="btn btn-outline-white">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">Scripts</h4></div>
        <div v-for="script in scripts" :key="script.id">
          <h4 class="mt-1">Script {{ script.id }}:</h4>
          <input class="form-control w-25 mt-1" placeholder="Name" v-model="script.name">
          <input class="form-control w-25 mt-1" placeholder="Type" type="number" v-model="script.type">
        </div>
        <button class="btn btn-success mt-5" @click="addScript">Add <i class="bi bi-plus"></i></button>
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
    <imageUpload v-if="show" @close="show = false" @upload="upload">
    </imageUpload>
  </div>
</template>

<script>
import {Server, ServerScript} from "../../../models";
import imageUpload from "./components/imageUpload";

export default {
  name: "edit",
  data() {
    return {
      show: false,
      serverScripts: [],
      defaultImg: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwNkQyMjgzOUNEOTExRUE4RThBRkNGQzc1NzY0M0ExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwNkQyMjg0OUNEOTExRUE4RThBRkNGQzc1NzY0M0ExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjA2RDIyODE5Q0Q5MTFFQThFOEFGQ0ZDNzU3NjQzQTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjA2RDIyODI5Q0Q5MTFFQThFOEFGQ0ZDNzU3NjQzQTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwICAwQFBAQEBAQFBgUFBQUFBQYGBwcIBwcGCQkKCgkJDAwMDAwMDAwMDAwMDAwMAQMDAwUEBQkGBgkNCwkLDQ8ODg4ODw8MDAwMDA8PDAwMDAwMDwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABoAGgDAREAAhEBAxEB/8QAbQABAQACAwEAAAAAAAAAAAAAAAkECAIFBgcBAQAAAAAAAAAAAAAAAAAAAAAQAAEDBAEDAgQEBwAAAAAAAAABAgMEBQYHERITCCExQTIUCVFhFhdxIlJjJBUmEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4SSRxRvlle2OKNqukkcqI1rUTlVVV9EREAnHoXzE/cryWz7Ca2s/wCKydVg1b1eiMfaWvR3w5/zY0fN6r6K1Gp7gYfnJtTyI0nfMYybXmdvtWAZNCtDLQLa7VVJSXSBFere9U0ksipPF/M1FcvCsf8ADhAN4dQbGt+1tZYdsKhVkceQ22Oeuga5FbT1cfMdXDz/AGpmPbyv4cgTRxzyX35u/wAoKnA9WZ4tj1pLepO2kFstVWkFjt3Sypq0nqKSaRVqEYrmdT1Trka1PThAK8AAAAAAAAANJvOzdH7W6fqsetNZ2Mt2T3bRbO27iWCh6U+vqU4VHJxG5IkVPZ0iL8AJX5JhuKav1Zo7a2BbIx+v2tS3Fblllltt3pKquo5JnNqrarqWOd0jPp2xduZOn538L+YWCvVHjfmH4y9dH2oJMztLaq2qq9X+tvtIq8McqLzxFUMWN39TFX4OAlnqPyOvOmNIb107dXTW7LmSvp8NpXq5JaSrrJPoLtH1ojmsdTtTusTn1f1fxQN4Pt36Y/Rmua3aN5pO3kGx+EtPWnD4bNA5e1x8U+okRZF/FqRqBRMAAAAAAAABFbbuutw+UflJSUt2wLMMW1nTV7bJbshuForaKlprLROc+pqmTVMPZSSpVJHx8/Mro2r7Affcl+2hqhuPXt+KZZmH6mZQzusDblV2+SkdWNYqwtnbFb4nqxz+Ed0vReAPMfb8ft7Xt3ybWOe62y/H8UvaOu1iu9zs1fTUdLcYWoyeJ08sLY2pURNRUVV46mIierwOq8mvEa5Zr5O4TcsepZYsU21Ud3Ma6Fq9NvmtzGur5FdwqNWenajo+r5pepAKuW630Vpt9BarbTMo7dbKeKkoKSJOlkUMLEjjY1E9ka1ERAMwAAAAAAAAAAAAHCLxynt7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k='
    }
  },
  components: {
    imageUpload
  },
  computed: {
    server() {
      if (this.$route.params.id) {
        return this.$store.getters["Server/byId"](this.$route.params.id);
      }
      return new Server();
    },
    scripts() {
      if (this.server) {
        let script = this.$store.getters["ServerScripts/byServerId"](this.server.id);

        if (script.length > 0) {
          return script.concat(this.serverScripts);
        }
        this.$store.dispatch("ServerScripts/byId", this.server.id);
      }
      return [].concat(this.serverScripts);
    }
  },
  mounted() {
    this.$store.dispatch("Server/admin");
  },
  methods: {
    getImage() {
      if (this.server.image) {
        console.log(this.server);
        return this.server.image.replace('dataimage/pngbase64', 'data:image/png;base64,');
      }
      return this.defaultImg;
    },
    upload(base64) {
      this.show = false;
      this.server.image = base64;
    },
    addScript() {
      let newScript = new ServerScript({server_id : this.server.id})
      this.serverScripts.push(newScript);
    },
    send() {
      this.server.update().then(() => {
        this.scripts.forEach(script => {
          script.update();
        });
        this.serverScripts.forEach(script => {
          script.update();
        });
        this.$store.dispatch("Alerts/alert",  { type: 'success', title: 'Update Server',
          message: 'Server successfully Edit/Updated' });
        this.$router.go(-1);
      });
    }
  }
}
</script>

<style scoped>
select:invalid { color: gray; }
</style>
