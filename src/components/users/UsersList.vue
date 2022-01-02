<template>
<button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  data(){
    return {
      changesSaved: false
    }
  },
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    confirmInput(){
       this.$router.push('/teams')
    },
    saveChanges() {
      this.changesSaved = true
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('UsersList cmb beforeEnter')
    console.log(to, from)
    next()
  },
  beforeRouteLeave(to, from, next){
    console.log('Userslist cmp beforeRouteLeave')
      console.log(to, from)

    if(this.changesSaved){
      next()
    } else {
     const userWantsToLeave =   confirm('Are you sure ? you got unsaved changes!')
      next(userWantsToLeave)
    }
  }

};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>