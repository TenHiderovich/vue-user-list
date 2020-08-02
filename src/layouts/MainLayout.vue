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
          <router-view />
        </v-container>
      </v-main>

    </v-app>
</template>

<script>
import authToken from '../utils/authToken'

export default {
    computed: {
        authToken,
    },
    methods: {
      logout() {
        this.authToken = '';
        this.$router.push('/');
      },
    }
}
</script>

<style lang="sass" scoped>
    
</style>