import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
import { STATUS_CODES } from 'http';
// import Vue from 'vue'
// Vue.use(Vuex)
// const store = new Vuex.Store({
//   state:{
//     count:0
//   },
//   mutations:{
//     updateCount(state,num){
//       state.count = num
//     }
//   }
// })

// export default store
const isDev = process.env.NODE_ENV === 'development'

export default()=>{
  return new Vuex.Store({
      strict :isDev,
      state:defaultState,
      mutations,
      getters,
      actions,
      modules:{
        a:{
          namespaced:true,//独立mutation
          state:{
            text:1,
          },
          mutations:{
            updateText(state){
              console.log("a.state",state)
              state.text =text
            }
          }
        },
        b:{
          state:{
            text:2,
          }
        }
      }
    })
}