import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base:'/base/',
    // linkActiveClass:'',
    // linkExactActiveClassL:'',
    scrollBehavior(to,from,savePosition){
        if(savePosition){
          return savePosition
        }else{
          return {
            x:0,
            y:0
          }
        }
    },
    fallback:true
    // parseQuery(query){

    // },
    // stringifyQuery(obj){

    // },
  })
}
