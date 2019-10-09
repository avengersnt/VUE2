<template>
  <div class="page2">
    <h1>{{ msg }}</h1>
    <p>これはページ2画面です</p>
    <router-view/>
    <ul>
      <li><router-link to="/">戻る</router-link></li><!-- Page1画面へ -->
      <li><router-link to="/page3">経路検索</router-link></li><!-- Page3画面へ -->
      <li><router-link to="/page4">周辺の駐車場を表示</router-link></li><!-- Page4画面へ -->
    </ul>
  </div>
</template>


<script>
export default {
  name: 'Page2',
  data () {
    return {
      msg: 'Page2'
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
