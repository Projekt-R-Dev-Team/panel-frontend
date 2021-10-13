<template>
  <div class="container mt-5 px-6">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">Server | {{ Server.name }}</h3></div><div></div></div></div></div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body">
            <div class="card-title mb-4">
              <h4>Information</h4>
            </div>
            <div class="mt-2 mb-2">
              {{ Server.information }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title mb-4">
              <h4>Scripts</h4>
            </div>
            <div v-if="Scripts">
              <div class="d-flex justify-content-between align-items-center mb-4" v-for="script in Scripts" :key="script.id">
                <div>{{ script.name }}</div>
                <button :class='ScriptButton(script.type)' @click="execScript(script.id)" style="width: 8rem"> {{ script.name }} </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Server } from "../../models";

export default {
  name: "detail",
  props: {
    server: {
      type: Server
    }
  },
  computed: {
    Server() {
      if (!this.server) {
        let server;
        server = this.$store.getters["Server/byId"](this.$route.params.id);

        if (!server.id) {

          this.$store.dispatch("Server/all");
          server = this.$store.getters["Server/byId"](this.$route.params.id);

          if (!server.id) {
            return new Server;
          }

          return server;
        }

        return server;
      }

      return this.server
    },
    Scripts() {
      if (this.Server) {
        let script = this.$store.getters["ServerScripts/byServerId"](this.Server.id);

        if (script.length > 0) {
          return script;
        }
        this.$store.dispatch("ServerScripts/byId", this.Server.id);
      }
      return null;
    }
  },
  methods: {
    ScriptButton(type) {
      switch (parseInt(type)) {
        case 1:
          return `btn btn-success`
          break;
        case 2:
            return `btn btn-danger`
            break;
          default:
            return `btn btn-dark`
            break;
      }
    },
    execScript(id) {
      console.log('Script: ', id)
      this.$store.dispatch("ServerScripts/execute", id)
    }
  }
}
</script>

<style scoped>

</style>
