<template>
  <div class="card">
    <div class="card-header bg-white border-bottom-0 py-4">
      <h4 class="mb-0">{{Title}}</h4>
    </div>
    <div class="table-responsive">
      <table class="table text-nowrap mb-0">
        <thead class="table-light">
        <tr>
          <th v-for="headline in MapData" :key="headline.name">
            {{ headline.name }}
          </th>
          <th v-if="Edit">Edit</th>
          <th v-if="Select">Select</th>
          <th v-if="Delete">Delete</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="row in ListData" :key="row.id">
            <td v-for="keys in Object.keys(MapData)" :key="keys">
              <div v-if="MapData[keys].image">
                <span class="avatar avatar-sm">
                  <img class="rounded-circle" :src="getAvatar(row[keys])"/>
                </span>
              </div>
              <div v-else>
                {{ row[keys] }}
              </div>
            </td>
            <td v-if="Edit">
              <button type="button" class="btn btn-outline-warning btn-icon" @click="$emit('editBtn', row.id)">
                <i class="bi bi-gear" />
              </button>
            </td>
            <td v-if="Select">
              <button type="button" class="btn btn-icon" @click="$emit('selectBtn', row.id)">
                <i class="bi bi-check2-circle" />
              </button>
            </td>
            <td v-if="Delete">
              <button type="button" class="btn btn-outline-danger btn-icon" @click="$emit('deleteBtn', row.id)">
                <i class="bi bi-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      defaultImg: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwNkQyMjgzOUNEOTExRUE4RThBRkNGQzc1NzY0M0ExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwNkQyMjg0OUNEOTExRUE4RThBRkNGQzc1NzY0M0ExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjA2RDIyODE5Q0Q5MTFFQThFOEFGQ0ZDNzU3NjQzQTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjA2RDIyODI5Q0Q5MTFFQThFOEFGQ0ZDNzU3NjQzQTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwICAwQFBAQEBAQFBgUFBQUFBQYGBwcIBwcGCQkKCgkJDAwMDAwMDAwMDAwMDAwMAQMDAwUEBQkGBgkNCwkLDQ8ODg4ODw8MDAwMDA8PDAwMDAwMDwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABoAGgDAREAAhEBAxEB/8QAbQABAQACAwEAAAAAAAAAAAAAAAkECAIFBgcBAQAAAAAAAAAAAAAAAAAAAAAQAAEDBAEDAgQEBwAAAAAAAAABAgMEBQYHERITCCExQTIUCVFhFhdxIlJjJBUmEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4SSRxRvlle2OKNqukkcqI1rUTlVVV9EREAnHoXzE/cryWz7Ca2s/wCKydVg1b1eiMfaWvR3w5/zY0fN6r6K1Gp7gYfnJtTyI0nfMYybXmdvtWAZNCtDLQLa7VVJSXSBFere9U0ksipPF/M1FcvCsf8ADhAN4dQbGt+1tZYdsKhVkceQ22Oeuga5FbT1cfMdXDz/AGpmPbyv4cgTRxzyX35u/wAoKnA9WZ4tj1pLepO2kFstVWkFjt3Sypq0nqKSaRVqEYrmdT1Trka1PThAK8AAAAAAAAANJvOzdH7W6fqsetNZ2Mt2T3bRbO27iWCh6U+vqU4VHJxG5IkVPZ0iL8AJX5JhuKav1Zo7a2BbIx+v2tS3Fblllltt3pKquo5JnNqrarqWOd0jPp2xduZOn538L+YWCvVHjfmH4y9dH2oJMztLaq2qq9X+tvtIq8McqLzxFUMWN39TFX4OAlnqPyOvOmNIb107dXTW7LmSvp8NpXq5JaSrrJPoLtH1ojmsdTtTusTn1f1fxQN4Pt36Y/Rmua3aN5pO3kGx+EtPWnD4bNA5e1x8U+okRZF/FqRqBRMAAAAAAAABFbbuutw+UflJSUt2wLMMW1nTV7bJbshuForaKlprLROc+pqmTVMPZSSpVJHx8/Mro2r7Affcl+2hqhuPXt+KZZmH6mZQzusDblV2+SkdWNYqwtnbFb4nqxz+Ed0vReAPMfb8ft7Xt3ybWOe62y/H8UvaOu1iu9zs1fTUdLcYWoyeJ08sLY2pURNRUVV46mIierwOq8mvEa5Zr5O4TcsepZYsU21Ud3Ma6Fq9NvmtzGur5FdwqNWenajo+r5pepAKuW630Vpt9BarbTMo7dbKeKkoKSJOlkUMLEjjY1E9ka1ERAMwAAAAAAAAAAAAHCLxynt7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k='
    }
  },
  props: {
    ListData: Array,
    Title: String,
    MapData: Object,
    Edit: Boolean,
    Select: Boolean,
    Delete: Boolean
  },
  methods: {
    getAvatar(image) {
      if (image) {
        return image.replace('dataimage/pngbase64', 'data:image/png;base64,');
      }
      return this.defaultImg
    }
  }
}
</script>

<style scoped>

</style>
