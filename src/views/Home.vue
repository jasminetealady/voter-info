<template>
  <div class="home">
    <div class="header w-full min-h-screen flex flex-col items-center justify-center py-10">
      <h1
        class="text-blue font-bold text-4xl text-center font-body px-4"
      >2020 Voter Information</h1>
      <div class="w-full sm:w-8/12 md:w-6/12 px-4">
        <div class="my-5 w-full items-center flex flex-col justify-between">
          <input
            @keyup.enter="requestData()"
            placeholder="Enter valid US residential address"
            class="text-gray-700 border-gray-300 border py-2 px-4 w-8/12 md:w-2/4 rounded"
            type="text"
            v-model="address"
          />
          <button
            @click="requestData()"
            class="bg-red text-white font-bold tracking-wide rounded mt-8 py-2 px-4"
          >Retrieve Voter Information</button>
        </div>


      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      address: '560 Boylston St Boston',
    }
  },
  methods: {
    async requestData() {
      const key = process.env.VUE_APP_API_KEY
      const { address } = this
      if (address) {
        const url = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${address}&key=${key}&electionId=2000`
        await fetch(url)
          .then(resp => resp.json())
          .then(data => (this.$store.dispatch('setData', data)))
        this.$router.push('/dates')
      }
    },
  },
}
</script>

<style lang="scss">
</style>
