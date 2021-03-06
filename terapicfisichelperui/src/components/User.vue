<template>
  <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="description"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <v-text-field
            id="user-search"
            label="Search User"
            append-icon="search"
            class="text-xs-center"
            v-model="search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
            >New User</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-name"
                        v-model="name"
                        label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-lastname"
                        v-model="lastName"
                        label="LastName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-description"
                        v-model="description"
                        label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-birth"
                        type="date"
                        v-model="birth"
                        label="Birth"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-address"
                        v-model="address"
                        label="Address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-phone"
                        v-model="phone"
                        label="Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-age"
                        v-model="age"
                        label="Age"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-email"
                        v-model="email"
                        label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-country"
                        v-model="country"
                        label="Country"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-gender"
                        v-model="gender"
                        label="Gender"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="user-password"
                        v-model="password"
                        label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-show="isValidName">
                    <div
                        class="red--text"
                        v-for="v in validMessage"
                        :key="v"
                        v-text="v"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="user-cancel" color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn id="user-save" color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.birth }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.country }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.password }}</td>

        <td class="justify-center layout px-0">
          <v-icon id="user-edit" small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon id="user-delete" small class="mr-2" @click="deleteItem(item)">delete</v-icon>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listUsers">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
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
    dialog: false,
    editedIndex: -1,
    users: [],
    valid: 0,
    validMessage: [],
    headers: [
      { text: "Name", value: "name", sortable: true },
      { text: "LastName", value: "lastName", sortable: false },
      { text: "Description", value: "description", sortable: false },
      { text: "Birth", value: "birth", sortable: false },
      { text: "Address", value: "address", sortable: false },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Age", value: "age", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Country", value: "country", sortable: false },
      { text: "Gender", value: "gender", sortable: false },
      { text: "Password", value: "password", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listUsers();
  },
  methods: {
    listUsers() {
      let me = this;
      axios
          .get("api/Users")
          .then(function(response) {
            me.users = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.lastName = item.lastName;
      this.description = item.description;
      this.birth = item.birth;
      this.address = item.address;
      this.phone = item.phone;
      this.age = item.age;
      this.email = item.email;
      this.country = item.country;
      this.gender = item.gender;
      this.password = item.password;
      this.editedIndex = 1;
      this.dialog = true;
    },
    deleteItem(item) {
      let me = this;
      if (confirm("¿Estás seguro que quieres eliminar este User?"))
        axios
            .delete("api/Users/" + item.id, {
              id: item.id,
            })
            .then(function(response) {
              console.log(item.id);
              me.listUsers();
              me.close();
              me.clean();
            })
            .catch(function(error) {
              console.log(error);
            });
    },
    close() {
      this.dialog = false;
      this.editedIndex = -1;
    },
    clean() {
      this.id = "";
      this.name = "";
      this.lastName = "";
      this.description = "";
      this.birth = "";
      this.address = "";
      this.phone = 0;
      this.age = 0;
      this.email = "";
      this.country = "";
      this.gender = "";
      this.password = "";
    },
    save() {
      if (this.isValidName()) {
        return;
      }
      let me = this;
      if (this.editedIndex > -1) {
        axios
            .put("api/Users/" + me.id, {
              id: me.id,
              name: me.name,
              lastName: me.lastName,
              description: me.description,
              birth: me.birth,
              address: me.address,
              phone: me.phone,
              age: me.age,
              email: me.email,
              country: me.country,
              gender: me.gender,
              password: me.password,
            })
            .then(function(response) {
              me.close();
              me.listUsers();
              me.clean();
            })
            .catch(function(error) {
              console.log(error);
            });
      } else {
        axios
            .post("api/Users", {
              name: me.name,
              lastName: me.lastName,
              description: me.description,
              birth: me.birth,
              address: me.address,
              phone: me.phone,
              age: me.age,
              email: me.email,
              country: me.country,
              gender: me.gender,
              password: me.password,
            })
            .then(function(response) {
              me.close();
              me.listUsers();
              me.clean();
            })
            .catch(function(error) {
              console.log(error);
            });
      }
    },
    isValidName() {
      this.valid = 0;
      this.validMessage = [];
      if (this.name.length < 3 || this.name.length > 50) {
        this.validMessage.push(
            "El Nombre debe tener mas de 3 caracteres y menos de 50 caracteres"
        );
      }

      if (this.lastName.length < 3 || this.lastName.length > 50) {
        this.validMessage.push(
            "El Apellido debe tener mas de 3 caracteres y menos de 50 caracteres"
        );
      }

      if (this.email.length < 3 || this.email.length > 80) {
        this.validMessage.push(
            "El Email debe tener mas de 3 caracteres y menos de 80 caracteres"
        );
      }

      if (this.password.length < 8 || this.email.length > 50) {
        this.validMessage.push("El Password debe tener al menos 8 caracteres");
      }

      if (this.validMessage.length) {
        this.valid = 1;
      }
      return this.valid;
    },
  },
};
</script>
