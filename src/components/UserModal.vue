<template>
  <v-form 
    class="modal" 
    ref="form"
  >
    <v-text-field
      v-model="fields.first_name"
      :rules="nameRules"
      label="First name"
      required
    ></v-text-field>

    <v-text-field
      v-model="fields.last_name"
      :rules="nameRules"
      label="Last name"
      required
    ></v-text-field>

    <v-text-field
      v-model="fields.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-checkbox
      v-model="fields.is_hide"
      label="Is hide"
    ></v-checkbox>

    <v-btn 
      color="primary" 
      @click="submit"
    >
      submit
    </v-btn>

  </v-form>
</template>

<script>
export default {
  name: 'UserModal',
  
  props: {
    user: {
      propId: {
        id: Number, default: null,
      },
      propFirstName: {
        first_name: String, default: '',
      },
      propLastName: {
        last_name: String, default: '',
      },
       propEmail: {
        email: String, default: '',
      },
      propIsHide: {
        is_hide: Boolean, default: false,
      }
    },
    handleSubmit: Function
  },

  data () {
    return {
      fields: { ...this.user },
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },

  methods: {
    submit() {
      this.handleSubmit(this.fields);
    },
  }
}
</script>

<style lang="sass" scoped>
  .modal
    background-color: #fff
    padding: 30px
</style>