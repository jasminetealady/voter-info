<template>
  <div class="bg-white rounded shadow absolute modal w-11/12 sm:w-8/12 xl:w-5/12">
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['title', 'type'],
  computed: mapState({
    stateSelected: state => state.userState
  })
}
</script>

<style lang="scss" scoped></style>
