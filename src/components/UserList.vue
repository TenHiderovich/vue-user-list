<template>
  <div>
    <v-progress-circular 
      v-if="loading" 
      indeterminate 
      size="64"
    ></v-progress-circular>
    <ul 
      v-else 
      class="user-list"
    >
      <li 
        v-for="user in allUsersWithoutHide" 
        :key="user.id" 
        class="user-list__item"
      >
        <UserCard 
          :user="user" 
          @handle-edit-modal="handleEditModal"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import UserCard from './UserCard';

export default {
  name: 'UserList',
  
  components: {
    UserCard,
  },

  data() {
    return {
      loading: true,
      changedUserId: null
    }
  },

  computed: {
    ...mapGetters(['allUsersWithoutHide', 'allUsers','usersCount']),
  },

  watch: {
    allUsers(newValue, oldValue) {
      if (newValue.length === oldValue.length) {
        const newUserDate = newValue.find(user => user.id === this.changedUserId);
        const oldUserDate = oldValue.find(user => user.id === this.changedUserId);

        if (newUserDate.is_hide && newUserDate.is_hide !== oldUserDate.is_hide) {
          this.$emit('show-snackbar', `User ${this.changedUserId} was hidden`);
        }
      }
    }
  },
  
  mounted() {
    this.fetchUsers()
      .then(data => {
        this.updateUsers(data.data)
        this.loading = false;
      })
      .catch(error => {
        this.$emit('show-dangerous-snackbar');
        this.loading = false;
      });
  },

  methods: {
    ...mapActions(['fetchUsers', 'editUser', 'addUser']),
    ...mapMutations(['updateUsers']),
    handleEditModal(data) {
      this.changedUserId = data.id;
      this.$emit('edit-user-modal', data);
    },
  },
}
</script>

<style lang="sass" scoped>
  .user-list
    display: flex
    flex-wrap: wrap

    list-style: none
    padding: 0
    margin: 0 -10px

    &__item
      width: 25%
      margin-bottom: 20px
      padding: 0 10px

  @media screen and (max-width: 1040px) 
    .user-list

      &__item
        width: 50%

  @media screen and (max-width: 500px) 
    .user-list

      &__item
        width: 100%
</style>