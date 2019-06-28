<template>
  <!-- <header :class="$style.mainHeader"> -->
  <header class="main-header">
    <h1>JTodo</h1>
    <button @click="add">
      add
    </button>
    <div id='add-container'>

    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      item: 0,
      addContainer: null,
      addImg:null,
      imgSrc:
        "http://tdimage.zhaopin.com/group7/M00/0E/88/wKjZGlzU18WAftSWAAHSv4SlNY8019.png"
    };
  },
  mounted() {
    this.addContainer = document.getElementById("add-container");
    this.addImg =document.createElement("img");
    this.addImg.src="http://tdimage.zhaopin.com/group7/M00/0E/88/wKjZGlzU18WAftSWAAHSv4SlNY8019.png"
  },
  methods: {
    add() {
      this.addImg.setAttribute("class", `img-${this.item++},img-continue`);
      this.addContainer.appendChild(this.addImg);
    },
    destroyImg(){

    }
  }
};
</script>

<style lang="stylus" scoped>
.main-header {
  text-align: center;

  h1 {
    font-size: 100px;
    color: rgba(175, 47, 47, 0.4);
    font-weight: 100;
    margin: 20px;
  }

  .img-continue {
    -moz-animation: cssAnimation 0s ease-in 5s forwards;
    /* Firefox */
    -webkit-animation: cssAnimation 0s ease-in 5s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimation 0s ease-in 5s forwards;
    /* Opera */
    animation: cssAnimation 0s ease-in 5s forwards;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }

  @keyframes cssAnimation {
    to {
      width: 0;
      height: 0;
      overflow: hidden;
    }
  }

  @keyframes cssAnimation {
    to {
      width: 0;
      height: 0;
      visibility: hidden;
    }
  }
}
</style>

