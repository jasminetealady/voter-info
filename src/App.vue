<template>
  <div id="app" class="w-full h-full font-body min-h-screen">
    <nav v-if="$route.path !== '/'" class="ballot-bar border-b-1">
      <router-link class="px-6 cursor-pointer absolute" to="/">
        <img class="h-8" src="./images/left-arrow.svg" />
      </router-link>
      <div class="flex justify-center w-full">
        <h1 v-if="stateSelected" class="ballot-bar-header">{{ stateSelected }}</h1>
        <h1 v-else class="ballot-bar-header">2020 Election Dates</h1>
      </div>
    </nav>
    <router-view />
    <footer
      class="text-gray-800 text-xs items-center justify-between flex h-8 w-full fixed bottom-0 bg-lightblue"
    >
      <span class="ml-2">Copyright 2020</span>
      <span class="mr-2">
        Icons
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">made by Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>
      </span>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    stateSelected: state => state.userState
  })
}
</script>

<style lang="scss"></style>
