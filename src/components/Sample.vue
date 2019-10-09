<template>
  <div class="sample">
    <h1>{{ msg }}</h1>
    <p>これはサンプル画面です</p>
  </div>
</template>

<script>
export default {
  name: 'Sample',
  data () {
    return {
      msg: 'Sample'
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
