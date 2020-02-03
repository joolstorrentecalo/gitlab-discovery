<template>
  <div
    id="app"
    class="d-flex"
  >
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import router from './router';

@Component
export default class Home extends Vue {
  mounted() {
    if (localStorage.getItem('initial_config') === 'complete') {
      router.push('/home');
    }
  }
}

</script>

<style lang="scss">
@import 'assets/stylesheets/framework';
// stylelint-disable selector-max-id

html,
body,
#app {
  height: 100%;
  overflow: hidden;
  width: 100%;
}

</style>
