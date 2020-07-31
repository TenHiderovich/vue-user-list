<template>
  <v-card
    outlined
    tile
    class="login-form"
    >
    <v-form>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        class="login-form__field"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        required
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        @click:append="showPassword = !showPassword"
        class="login-form__field"
      ></v-text-field>

      <v-btn @click="submit" color="primary">Login</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import authToken from '../utils/authToken'

export default {
  name: 'LoginForm',

  data () {
    return {
      email: '',
      showPassword: false,
      password: '',
      passwordRules: [
        v => !!v || 'Required.',
        v => v.length >= 8 || 'Min 8 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },

  computed: {
    authToken,
  },
  
  methods: {
    submit (data) {
      const response = fetch('https://reqres.in/api/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify({ email: this.email, password: this.password })
      })
      
      response
        .then(response => response.json())
        .then(data => {
          this.authToken = data.token;
          this.$router.push('/users');
        });
    },
  }
}
</script>

<style lang="sass">
  .login-form
    width: 100%
    max-width: 400px
    padding: 30px

  .login-form__field
    margin-bottom: 20px

</style>