<template>
  <v-card class="mx-auto">
    <v-card-title>
      <span class="headline">{{itemUser.name}} {{itemUser.lastName}}</span>
    </v-card-title>
    <v-container>
      <v-card-actions class="justify-center">
          <v-avatar
              class="justify-center"
              size=40
              tile
              @click="open">
            <v-img
                src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"></v-img>
          </v-avatar>
      </v-card-actions>
      <v-card-text>Especialidad: {{itemSpecialist.specialty}}</v-card-text>
      <v-card-text>Correo: {{itemUser.email}}</v-card-text>
      <v-card-text>Teléfono: {{itemUser.phone}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="navigateToSpecialists">Volver</v-btn>
      </v-card-actions>
    </v-container>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-avatar
            class="profile"
            color="grey"
            size=400
            tile>
          <v-img
              src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"></v-img>
        </v-avatar>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn id="session-cancel" color="blue darken-1" text @click="close">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "specialist-profile",
  data() {
    return {
      itemSpecialist: {
        id: "",
        userId: "",
        specialty: "",
      },
      itemUser: {
        id: "",
        name: "",
        lastName: "",
        description: "",
        birth: "",
        address: "",
        phone: 0,
        age: 0,
        email: "",
        country: "",
        gender: "",
        password: "",
      },
      dialog: false,
    }
  },
  methods: {
    getSpecialist(id) {
      axios
          .get("api/Specialists/" + id)
          .then((response) => {
            this.itemSpecialist = response.data;
            this.getUser(this.itemSpecialist.userId);
          })
          .catch(e => {
            console.log((e));
          });
    },
    getUser(userId) {
      axios
          .get("api/Users/" + userId)
          .then((response) => {
            this.itemUser = response.data;
          })
          .catch(e => {
            console.log((e));
          });
    },
    navigateToSpecialists(id) {
      this.$router.push({name:'specialists'})
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  },
  created() {
    this.getSpecialist(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
