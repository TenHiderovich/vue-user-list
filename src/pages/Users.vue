<template>
  <v-app id="inspire">
      <v-app-bar 
        app 
        color="primary" 
        dark
      >
        <v-toolbar-title>Users</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          text 
          large 
          color="white" 
          @click="logout"
        >
          Logout
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <div class="list-info">
            <h2>Количество пользователей: {{ usersCount }}</h2>
            <h2>Сумма id видимых: {{ usersIdCount }}</h2>
          </div>

          <UserList 
            @show-snackbar="showSnackbar" 
            @show-dangerous-snackbar="showDangerousSnackbar"
            @edit-user-modal="editUserModal"
            />
        </v-container>
      </v-main>

      <v-dialog
        v-model="dialogVisibility"
        max-width="350">
        <UserModal 
          v-if="dialogVisibility" 
          :user="currentUser"
          :handleSubmit="handleSubmitModal"
        />
      </v-dialog>

      <v-btn 
        class="add-btn" 
        fab 
        dark 
        color="primary" 
        @click="addUserModal"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

      <v-snackbar
        :timeout="snackbar.timeout"
        v-model="snackbar.visibility"
        :color="snackbar.color"
        >
        {{ snackbar.text }}
      </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

import UserList from '../components/UserList'
import UserModal from '../components/UserModal'
import authToken from '../utils/authToken'

export default {
  name: 'Users',

  components: {
    UserList,
    UserModal,
  },

  data () {
    return {
      snackbar: {
        text: '',
        visibility: false,
        timeout: null,
        color: 'primary',
      },
      currentUser: {},
      handleSubmitModal: null,
      dialogVisibility: false
    }
  },

  computed: {
    authToken,
    ...mapGetters(['allUsersWithoutHide', 'usersCount', 'usersIdCount']),
  },

  watch: {
    dialogVisibility(newValue) {
      if (!newValue) {
        this.currentUser = {}
      }
    }
  },

  methods: {
    ...mapActions(['fetchUsers', 'editUser', 'addUser']),
    ...mapMutations(['updateUsers', 'createUser', 'updateUser']),

    addUserModal(data) {
      this.handleSubmitModal = this.addNewUser;
      this.toggleDialog();
    },
    editUserModal(data) {
      this.currentUser = data;
      this.handleSubmitModal = this.editSelectedUser;
      this.toggleDialog();
    },
    toggleDialog() {
      this.dialogVisibility = !this.dialogVisibility;
    },
    logout() {
      this.authToken = '';
      this.$router.push('/');
    },
    addNewUser(data) {
      const newUserData = { ...data, id: Math.random() + Date.now() };
      this.addUser(newUserData)
        .then(() => {
          this.createUser(newUserData);
          this.toggleDialog();
        })
        .catch(error => this.showDangerousSnackbar(error.message));
    },
    editSelectedUser(data) {
      this.editUser(data)
        .then(() => {
          this.updateUser(data);
          this.toggleDialog();
        })
        .catch(error => this.showDangerousSnackbar(error.message));
    },
    showSnackbar(mess) {
      this.snackbar.text = mess;
      this.snackbar.timeout = 4000;
      this.snackbar.visibility = true;
    },
    showDangerousSnackbar(mess) {
      this.snackbar.text = mess;
      this.snackbar.color = 'red darken-1';
      this.snackbar.timeout = 4000;
      this.snackbar.visibility = true;
    }
  }
}
</script>

<style lang="sass" scoped>
  .add-btn
    position: fixed
    right: 30px
    bottom: 30px

  .list-info
    padding: 30px 0
</style>