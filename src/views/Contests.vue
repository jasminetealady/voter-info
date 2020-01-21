<template>
  <div class="flex items-center flex-col w-full sm:w-8/12 md:w-6/12">
    <div v-if="!data">
      <div
      :key="contest.office"
      v-if="contest.office"
      v-for="contest in data.contests"
      class="border bg-white rounded shadow-md w-10/12 px-4 py-10 my-10 text-center"
    >
      <div class="w-full justify-center items-center flex flex-col py-5">
        <h1 class="text-red text-2xl font-bold capitalize">{{ contest.office }}</h1>
        <h2 class="text-gray-700 text-lg font-bold capitalize mt-2">{{ contest.district.name }}</h2>
      </div>

      <div class="w-full justify-center flex flex-wrap">
        <div
          :key="candidate.party"
          :class="partyColor(candidate.party)"
          class="border shadow text-center flex rounded py-12 flex-col justify-center items-center w-full p-2 mx-2 my-2"
          v-for="candidate in contest.candidates"
        >
          <p class="text-xl text-white font-bold mb-4 capitalize">{{ candidate.name }}</p>
          <a
            v-if="candidate.phone"
            class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
            :href="`tel:+1-${candidate.phone}`"
            target="_blank"
            >Phone</a
          >
          <a
            v-if="candidate.email"
            class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
            :href="`mailto:${candidate.email}`"
            target="_blank"
            >Email</a
          >
          <a
            v-if="candidate.candidateUrl"
            class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor hover:scale"
            :href="candidate.candidateUrl"
            target="_blank"
            >Website</a
          >
          <a
            class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
            :key="channel.type"
            v-for="channel in candidate.channels"
            :href="channel.id"
            target="_blank"
            >{{ channel.type }}</a
          >
        </div>
      </div>
    </div>


    </div>
    <p class="text-center" v-else>Under Construction</p></div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    partyColor(party) {
      if (party === 'Republican') {
        return 'bg-red'
      }
      if (party === 'Democratic') {
        return 'bg-blue'
      }
      if (party === 'Independent') {
        return 'bg-purple'
      }
      return 'bg-green'
    },
  },
  computed: mapState({
    data: state => state.data,
  }),
};
</script>
