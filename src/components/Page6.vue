<template>
  <div class="page6">
    <h1>{{ msg }}</h1>
    <router-view/>
    <ul>
      <li><router-link to="/">Page1</router-link></li><!-- Page1画面へ -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page6',
  data () {
    return {
      msg: 'インフォメーションページ'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 30px;
}
</style>
