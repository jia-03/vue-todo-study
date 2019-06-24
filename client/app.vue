<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>
      {{counter}}
    </p>
    <p>
      {{fullName}}
    </p>
    <p>
      {{textA}}
    </p>
    <router-link :to="{name:'app'}">app</router-link>
    <router-link to="/login">login</router-link>
    <transition   name="fade">
    <router-view/>
    </transition>
    <!-- <todo></todo> -->
    <Footer></Footer>
    <!-- <router-view name='a'/> -->

  </div>
</template>
<script>
import {
  mapState, mapGetters,mapActions,mapMutations
  // mapGetters
} from 'vuex'

import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
import { setInterval } from 'timers';

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  mounted(){
    // console.log(this.$store)
    // let i = 1
    // setInterval(()=>{
    //   this.$store.commit('updateCount',i++)
    // },1000)
    // this.$store.dispatch('updateCountAsync',{
    //   num:5,
    //   time:1000
    // })
    this.updateCountAsync({
      num:5,
      time:1000
    })
  },
  computed:{
    // ...mapState(['count']),
    ...mapState({
      counter:(state)=>state.count,
      textA:(state)=>state.a.text
    }),
    ...mapGetters(['fullName']),
    // fullName(){
    //   return this.$store.getters.fullName
    // }
    // textA(){
    //   return this.$store.state.b.text
    // }
  },
  methods:{
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount','updateText'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>