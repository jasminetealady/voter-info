<template>
  <div class="w-full flex items-center justify-center gradient min-h-screen">
    <SearchModal v-if="!loading">
      <div class="my-20 w-full items-center flex flex-col justify-between">
        <h3 class="text-red text-3xl mb-10 font-bold">Step 1</h3>
        <p
          class="font-bold text-gray-700 text-xl text-center px-4 md:px-12 lg:px-24 mb-10 whitespace-pre-wrap"
        >Please enter a valid US residential address to retrieve your voter information for the 2020 election</p>
        <input
          @keyup.enter="requestData()"
          placeholder="Please Enter a Valid US Residential Address"
          class="search text-gray-700 border-gray-300 border py-2 px-4 w-10/12 md:w-2/4 rounded"
          type="text"
          v-model="address"
        />
        <span class="text-blue mt-4 font-bold" v-if="error">* {{error}} *</span>
        <button
          @click="requestData()"
          class="bg-red text-white font-bold tracking-wide rounded w-10/12 md:w-2/4 mt-8 py-2 px-4"
        >Retrieve Voter Information</button>
      </div>
    </SearchModal>
    <SearchModal v-else>
      <div class="my-20 w-full items-center flex flex-col justify-between">
        <p class="font-bold text-xl text-gray-700">Loading ...</p>
      </div>
    </SearchModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchModal from '@/components/SearchModal.vue'

export default {
  components: { SearchModal },
  data() {
    return {
      address: '',
      stateSelected: false,
      error: null,
      loading: false
    }
  },
  methods: {
    async requestData() {
      const key = process.env.VUE_APP_API_KEY
      const { address } = this
      if (address) {
        this.loading = true
        try {
          const url = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${address}&key=${key}&electionId=2000`
          await fetch(url)
            .then(resp => resp.json())
            .then(data => this.$store.dispatch('setData', data))
          this.error = null
          this.$router.push('/dashboard')
        } catch (err) {
          this.error = 'Invalid Search Address'
        }
        this.loading = false
      } else this.error = 'Must enter valid search address'
    }
  },
  computed: mapState({
    primary: state => state.primary
  })
}
</script>

<style lang="scss" scoped>
</style>
