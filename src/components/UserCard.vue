<template>
  <article class="user-card">
    <div 
      class="user-card__avatar" 
      :style="{ backgroundImage: `url(${user.avatar})` }"
    ></div>

    <h4 class="user-card__name">
      {{ user.last_name }} {{ user.first_name }}
    </h4>
    
    <div class="user-card__email">{{ user.email }}</div>

    <div class="user-card__company">Home</div>

    <v-btn
      fab 
      small 
      outlined 
      color="success" 
      @click="handleEditModal"
      class="user-card__edit-btn" 
    >
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
  </article>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'UserCard',
  props: {
    user: {
      id: Number,
      avatar: String,
      first_name: String,
      last_name: String,
      email: String,
    },
  },
  methods: {
    ...mapActions(['editUser']),
    ...mapMutations(['updateUser']),
    handleEditModal() {
      this.$emit('handle-edit-modal', this.user);
    }
  }
}
</script>

<style lang="sass" scoped>
  .user-card
    background-color: #eee
    padding: 30px 20px
    border-radius: 4px
    text-align: center
    position: relative

    &__avatar
      width: 200px
      height: 200px
      margin: 0 auto 20px auto
      background-color: #a2e07b
      background-size: cover
      background-position: center
      border-radius: 50%

    &__name
      font-size: 18px
      margin: 0 0 10px 0

    &__edit-btn
      position: absolute
      right: 10px
      top: 10px

    &__email
      margin-bottom: 10px
</style>