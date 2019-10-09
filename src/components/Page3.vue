<template>
  <div class="page3">
    <h1>{{ msg }}</h1>
    <p>これはページ3画面です</p>
    <router-view/>
    <ul>
      <li><router-link to="/page2">戻る</router-link></li><!-- Page2画面へ -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page3',
  data () {
    return {
      msg: 'Page3'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 48px;
}
</style>
