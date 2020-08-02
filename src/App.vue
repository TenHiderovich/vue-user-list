<template>
  <v-app id="app">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>


<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
import authToken from './utils/authToken'

export default {
  name: 'app',
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'Main') + 'Layout'
    }
  }
}
</script>

<style>

</style>
