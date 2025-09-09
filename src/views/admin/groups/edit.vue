<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 pb-5"><div><div class="d-flex justify-content-between align-items-center"><div class="mb-2 mb-lg-0"><h3 class="mb-0 fw-bold">{{ group.id ? `Edit News: ${group.name}` : 'New Group' }}</h3></div><div></div></div></div></div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">Group Settings</h4></div>
        <div class="row align-items-center mb-8 mt-2">
          <div class="col-md-2 mb-3 mb-md-0">
            <h5 class="mb-0">Name</h5>
          </div>
          <div class="col-md-9">
            <input type="text" class="form-control" placeholder="Username" v-model="group.name">
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">Users in Group</h4></div>
        <AdminList :map-data="{
          id : {
            name : 'Id'
          },
          username : {
            name: 'Username'
          },
          image : {
            name: 'Profile Picture',
            image: true
          }
        }" title="Users" :list-data="groupUsers" :delete="true" @deleteBtn="deleteUser">
        </AdminList>
        <button class="btn btn-success mt-5" @click="userShow = true">Add <i class="bi bi-plus"></i></button>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-body">
        <div class=" mb-6"><h4 class="mb-1">Servers in Group</h4></div>
        <AdminList :map-data="{
          id : {
            name: 'Id'
          },
          name : {
            name : 'Name'
          },
          type : {
            name : 'Type'
          }
        }" title="Servers" :list-data="group.servers[0]" :delete="true" @deleteBtn="deleteServer">
        </AdminList>
        <button class="btn btn-success mt-5" @click="serverShow = true">Add <i class="bi bi-plus"></i></button>
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
    <Modal @close="userShow = false" v-show="userShow" title="Add User" :size="2">
      <template>
        <div>
          <form class="d-flex align-items-center">
            <input type="search" class="form-control" placeholder="Search User..." v-model="userFilter">
          </form>
          <AdminList class="mt-5" :map-data="{
            id : {
              name : 'Id'
            },
            username : {
              name: 'Username'
            },
            image : {
              name: 'Profile Picture',
              image: true
            }
          }" title="Users" :list-data="allUsers" :Select="true" @selectBtn="addUser"></AdminList>
        </div>
      </template>
    </Modal>
    <Modal @close="serverShow = false" v-show="serverShow" title="Add User" :size="2">
      <template>
        <div>
          <form class="d-flex align-items-center">
            <input type="search" class="form-control" placeholder="Search User..." v-model="serverFilter">
          </form>
          <AdminList class="mt-5" :map-data="{
            id : {
              name : 'Id'
            },
            name : {
              name: 'Name'
            },
            type : {
              name: 'Type',
            }
          }" title="Users" :list-data="allServers" :Select="true" @selectBtn="addServer"></AdminList>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import {Groups} from "../../../models";
import AdminList from "../../../components/List/AdminList/List"
import Modal from "../../../components/Modal/Default";

export default {
  name: "edit",
  data() {
    return {
      userShow: false,
      serverShow: false,
      userFilter: "",
      serverFilter: ""
    }
  },
  computed: {
    group() {
      if (this.$route.params.id) {
        return this.$store.getters["Groups/byId"](this.$route.params.id);
      }
      return new Groups();
    },
    allUsers() {
      return this.$store.getters["User/all"].filter(u => u.username.toUpperCase().includes(this.userFilter.toUpperCase()) && this.group.users.find(_u => _u.id === u.id) === undefined);
    },
    groupUsers() {
      return this.group.users;
    },
    allServers() {
      return this.$store.getters["Server/admin"].filter(s => s.name.toUpperCase().includes(this.serverFilter.toUpperCase()) && this.group.servers[0].find(_s => _s.id === s.id) === undefined);
    }
  },
  components: {
    AdminList,
    Modal
  },
  mounted() {
    this.$store.dispatch("Groups/admin");
    this.$store.dispatch("User/all");
    this.$store.dispatch("Server/admin");
  },
  methods: {
    deleteUser(id) {
      this.group.users.splice(this.group.users.indexOf(this.group.users.find(u => u.id === id)), 1);
    },
    addUser(id) {
      this.group.users.push(this.$store.getters["User/byId"](id));
    },
    deleteServer(id) {
      this.group.servers[0].splice(this.group.users.indexOf(this.group.users.find(u => u.id === id)), 0);
    },
    addServer(id) {
      this.group.servers[0].push(this.$store.getters["Server/byId"](id));
    },
    send() {
      this.group.update().then(() => {
        this.$store.dispatch("Alerts/alert",  { type: 'success', title: 'Group Updated', message: 'Group successfully Edit/Updated' });
        this.$router.go(-1);
      })
    }
  }
}
</script>

<style scoped>

</style>
