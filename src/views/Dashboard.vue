/* eslint-disable comma-dangle */
<template>
  <div class="w-full">
    <div v-if="userState" class="w-full flex flex-col-reverse lg:flex-row items-start">
      <div class="w-full">
        <Registration v-if="isLg" />
        <Contests />
      </div>

      <Sidebar />
      <Registration v-if="!isLg" />
    </div>
    <div class="w-full h-screen justify-center flex items-center" v-else>
      <p class="w-8/12 sm:w-4/12 text-center font-bold text-3xl text-gray-700">
        Please return
        <router-link class="text-red" to="/">home</router-link>
        {{' '}}and enter your address
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Contests from '@/components/Contests.vue'
import Registration from '@/components/Registration.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: { Registration, Contests, Sidebar },
  data() {
    return {
      isLg: null
    }
  },
  mounted() {
    this.isLg = window.innerWidth >= 1024
    window.addEventListener(
      'resize',
      () => (this.isLg = window.innerWidth >= 1024)
    )
  },
  computed: mapState({
    userState: state => state.userState
  })
}
</script>

<style lang="scss" scoped></style>
