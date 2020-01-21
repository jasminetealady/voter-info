<template>
  <div class="border border-gray-200 my-12 sm:my-20 bg-white rounded shadow w-10/12 sm:w-8/12 md:w-8/12 lg:w-8/12 xl:w-5/12">
  <div class="ballot-bar">
    <img @click="$emit('back')" v-if="type === 'dates'" class="h-8 px-6 cursor-pointer absolute" src="../images/left-arrow.svg"/>
    <div class="flex justify-center w-full"><h1 class="ballot-bar-header">
      {{ title }}
    </h1></div>
  </div>
    <slot/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['title', 'type'],
  computed: mapState({
    stateSelected: state => state.userState,
  }),
};
</script>

<style lang="scss" scoped></style>
