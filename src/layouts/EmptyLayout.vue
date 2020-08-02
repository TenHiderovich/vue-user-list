<template>
  <v-container 
    fluid 
    class="height_full"
  >
    <v-row
      align="center"
      justify="center"
      class="height_full"
      >
      <router-view />
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
}
</script>

<style lang="sass" scoped>
  .height
    &_full
      height: 100%
</style>