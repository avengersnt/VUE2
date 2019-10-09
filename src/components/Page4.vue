<template>
  <div class="page4">
    <h1>{{ msg }}</h1>
    <p>これはページ4画面です</p>
    <router-view/>
    <ul>
      <li><router-link to="/page2">戻る</router-link></li><!-- Page2画面へ -->
      <li><router-link to="/page5">経路検索</router-link></li><!-- Page5画面へ -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page4',
  data () {
    return {
      msg: 'Page4'
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
