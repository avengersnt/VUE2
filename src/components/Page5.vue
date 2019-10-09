<template>
  <div class="page5">
    <h1>{{ msg }}</h1>
    <p>これはページ5画面です</p>
    <router-view/>
    <ul>
      <li><router-link to="/page4">戻る</router-link></li><!-- Page4画面へ -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page5',
  data () {
    return {
      msg: 'Page5'
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
