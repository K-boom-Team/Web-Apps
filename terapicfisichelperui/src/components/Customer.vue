<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    :search="search"
    sort-by="description"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Customer List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <v-text-field
            id="customer-search"
            label="Search Customer"
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
              >New Customer</v-btn
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
                        id="customer-description"
                        v-model="description"
                        label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        id="customer-userId"
                        v-model="userId"
                        label="UserId"
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
              <v-btn id="customer-cancel" color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn id="customer-save" color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.description }}</td>
        <td>{{ item.userId }}</td>

        <td class="justify-center layout px-0">
          <v-icon id="customer-edit" small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon id="customer-delete" small class="mr-2" @click="deleteItem(item)">delete</v-icon>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listCustomers">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    id: "",
    description: "",
    userId: "",
    dialog: false,
    editedIndex: -1,
    customers: [],
    valid: 0,
    validMessage: [],
    headers: [
      { text: "Description", value: "description", sortable: true },
      { text: "UserId", value: "userId", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listCustomers();
  },
  methods: {
    listCustomers() {
      let me = this;
      axios
        .get("api/Customers")
        .then(function(response) {
          me.customers = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editItem(item) {
      this.id = item.id;
      this.description = item.description;
      this.userId = item.userId;
      this.editedIndex = 1;
      this.dialog = true;
    },
    deleteItem(item) {
      let me = this;
      if (confirm("¿Estás seguro que quieres eliminar este Customer?"))
        axios
          .delete("api/Customers/" + item.id, {
            id: item.id,
          })
          .then(function(response) {
            console.log(item.id);
            me.listCustomers();
            me.close();
            me.clean();
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    close() {
      this.dialog = false;
    },
    clean() {
      this.id = "";
      this.description = "";
      this.userId = "";
    },
    save() {
      if (this.isValidName()) {
        return;
      }
      let me = this;
      if (this.editedIndex > -1) {
        axios
          .put("api/Customers/" + me.id, {
            id: me.id,
            description: me.description,
            userId: me.userId,
          })
          .then(function(response) {
            me.close();
            me.listCustomers();
            me.clean();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("api/Customers", {
            description: me.description,
            userId: me.userId,
          })
          .then(function(response) {
            me.close();
            me.listCustomers();
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

      if (this.description.length < 3 || this.description.length > 255) {
        this.validMessage.push(
          "La Descripción debe tener mas de 3 caracteres y menos de 255 caracteres"
        );
      }

      if (this.userId.length == null) {
        this.validMessage.push("El Codigo de Usuario si o si debes colocar");
      }

      if (this.validMessage.length) {
        this.valid = 1;
      }
      return this.valid;
    },
  },
};
</script>
