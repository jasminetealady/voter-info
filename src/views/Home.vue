<template>
  <div class="home">
    <div class="header w-full flex flex-col items-center justify-center py-10">
      <h1 class="text-blue font-bold text-4xl font-body">Vote 2020</h1>
      <div class="my-10 w-1/4 items-center flex justify-between h-10">
        <input class="border shadow py-2 px-4 w-2/4" type="text" v-model="address" />
        <button
          @click="requestData()"
          class="bg-red text-white rounded py-2 px-4"
        >Retrieve Voter Information</button>
      </div>
      <div
        v-if="contest.office"
        v-for="contest in data.contests"
        class="border bg-white rounded shadow-md Contest w-3/5 py-10 my-5"
      >
        <div class="w-full justify-center items-center flex flex-col py-5">
          <h1 class="text-red text-xl font-bold">Race: {{contest.office}}</h1>
          <h2 class="text-gray-700 text-xl font-bold">District: {{contest.district.name}}</h2>
        </div>

        <div class="p-4 w-full justify-center flex flex-wrap">
          <div
            :class="partyColor(candidate.party)"
            class="border text-center flex rounded py-12 flex-col justify-center items-center w-full p-2 mx-2 my-2"
            v-for="candidate in contest.candidates"
          >
            <p class="text-xl text-white font-bold mb-4">{{candidate.name}}</p>
            <a
              v-if="candidate.phone"
              class="text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
              :href="`tel:+1-${candidate.phone}`"
              target="_blank"
            >Phone</a>
            <a
              v-if="candidate.email"
              class="text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
              :href="`mailto:${candidate.email}`"
              target="_blank"
            >Email</a>
            <a
              v-if="candidate.candidateUrl"
              class="text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
              :href="candidate.candidateUrl"
              target="_blank"
            >Website</a>
            <a class="text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor" v-for="channel in candidate.channels" :href="channel.id">{{channel.type}}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- <code class="w-1 whitespace-pre-wrap">{{ data }}</code> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      address: '560 boylston st boston',
    };
  },
  methods: {
    requestData() {
      const key = 'AIzaSyA4bsHaqL9XM9xsRcLiSgvs9DV4xlNnIcA';
      const { address } = this;
      if (address) {
        const url = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${address}&key=${key}&electionId=2000`;
        fetch(url)
          .then(resp => resp.json())
          .then(data => (this.data = data));
      }
    },
    partyColor(party) {
      if (party === 'Republican') {
        return 'bg-red';
      }
      if (party === 'Democratic') {
        return 'bg-blue';
      }
      if (party === 'Independent') {
        return 'bg-purple';
      }
      return 'bg-green';
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.Contest {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
