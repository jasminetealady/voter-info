<template>
  <div class="w-full">
    <div class="Registered">
      <img v-if="yes === '' || yes" class="icon" src="../images/svg/050-yes.svg" />
      <img v-if="no" class="icon" src="../images/svg/no.svg" />

      <div class="flex items-center justify-between w-full">
        <h3 v-if="!yes && !no" class="GrayHeader">Are you registered to vote?</h3>
        <p v-if="yes" class="text-green font-bold text-xl">YAY!</p>
        <a
          v-if="no"
          :href="url"
          target="_blank"
          class="bg-red text-white font-bold tracking-wide rounded w-auto p-2 cursor-pointer text-center whitespace-no-wrap sm:whitespace-normal text-xs sm:text-base"
        >Check Registration</a>
        <div class="flex flex-col sm:flex-row ml-6">
          <label class="flex items-center">
            <input
              class="form-checkbox mr-4 w-6 h-6 text-green"
              type="checkbox"
              name="registered"
              v-model="yes"
            />
            <span class="label text-gray-700">Yes</span>
          </label>
          <label class="flex items-center ml-0 sm:ml-6 mt-2 sm:mt-0">
            <input
              name="registered"
              class="form-checkbox mr-4 w-6 h-6 text-red"
              type="checkbox"
              v-model="no"
            />
            <span class="label text-gray-700">No/Unsure</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    yes: {
      get() {
        return this.$store.state.registered
      },
      set(value) {
        const type = 'yes'
        this.$store.dispatch('setRegistrationStatus', { value, type })
      }
    },
    no: {
      get() {
        return this.$store.state.notRegistered
      },
      set(value) {
        const type = 'no'
        this.$store.dispatch('setRegistrationStatus', { value, type })
      }
    },
    url() {
      return this.$store.state.url
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
