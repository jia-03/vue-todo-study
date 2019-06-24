import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    // components: {
    //   default:Todo,
    //   a:Login
    // },
    name:'app',
    mate:{
       title:'this is app',
       description:'asd'
    },
    beforeEnter(to,from,next){
      console.log('beforeEnter'),
      next()
    },
  },
  {
    path: '/login',
    // component: Login
    component: ()=>import('../views/login/login.vue')
  }
]
