
import {createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';
import TeamsList from './Pages/TeamsList.vue'
import TeamMembers from './components/teams/TeamMembers.vue'
import UsersList from './Pages/UsersList.vue'
import NotFound from './Pages/NotFound.vue'
import TeamsFooter from './Pages/TeamsFooter'
import UsersFooter from './Pages/UsersFooter'




const router = createRouter( {
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/teams'},
    {
      name:'teams',
      path: '/teams',
      meta: {needsAuth: true},
      components: { default: TeamsList, footer: TeamsFooter},
      children: [

        {name: 'team-members', path:'/teams/:teamId', component: TeamMembers, props: true}

      ]}, //our-domain.com/teams => teamId

    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next){
        console.log('users beforeEnter')
        console.log(to, from)
        next()
      }
    },
    {path: '/:notFound(.*)', component: NotFound}
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2 , savedPosition) {
    // console.log(to, from, savedPosition)
    if(savedPosition){
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    }
  }
})
router.beforeEach(function(to, from, next){
  // console.log('Global beforeEach()')
  //  console.log(to, from)
  // if(to.name === 'team-members'){
  //  next()
  // }else {
  //   next({name: 'team-members', params: { teamId: 't2'}})
  // }
  if(to.meta.needsAuth){
    console.log('needs auth')
    next()
  } else {
    next()
  }
})

router.afterEach(function(to, from){
  console.log('global afterEach')
  console.log(to, from)
})


export default router