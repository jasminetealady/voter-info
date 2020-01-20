<template>
  <div class="home">
    <div class="header w-full min-h-screen flex flex-col items-center justify-center py-10">
      <h1 class="text-blue font-bold text-4xl text-center font-body px-4">2020 Election Voter Information</h1>
      <div class="w-full sm:w-8/12 md:w-6/12 px-4">
        <div class="my-5 w-full items-center flex flex-col justify-between">
          <input @keyup.enter="requestData()" placeholder="Enter valid US residential address" class="border shadow py-2 px-4 w-2/4 rounded" type="text" v-model="address" />
          <button
            @click="requestData()"
            class="bg-red text-white rounded mt-8 py-2 px-4"
          >Retrieve Voter Information</button>
        </div>

        <!--Contest Boxes-->
        <div
          :key="contest.office"
          v-if="contest.office"
          v-for="contest in data.contests"
          class="border bg-white rounded shadow-md w-full px-4 py-10 my-10 text-center"
        >
          <div class="w-full justify-center items-center flex flex-col py-5">
            <h1 class="text-red text-2xl font-bold capitalize">{{contest.office}}</h1>
            <h2 class="text-gray-700 text-lg font-bold capitalize mt-2">{{contest.district.name}}</h2>
          </div>

          <div class="w-full justify-center flex flex-wrap">
            <div
              :key="candidate.party"
              :class="partyColor(candidate.party)"
              class="border shadow text-center flex rounded py-12 flex-col justify-center items-center w-full p-2 mx-2 my-2"
              v-for="candidate in contest.candidates"
            >
              <p class="text-xl text-white font-bold mb-4 capitalize">{{candidate.name}}</p>
              <a
                v-if="candidate.phone"
                class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
                :href="`tel:+1-${candidate.phone}`"
                target="_blank"
              >Phone</a>
              <a
                v-if="candidate.email"
                class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
                :href="`mailto:${candidate.email}`"
                target="_blank"
              >Email</a>
              <a
                v-if="candidate.candidateUrl"
                class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor hover:scale"
                :href="candidate.candidateUrl"
                target="_blank"
              >Website</a>
              <a
                class="shadow text-gray-700 cursor bg-white rounded py-2 px-4 my-2 w-40 cursor"
                :key="channel.type"
                v-for="channel in candidate.channels"
                :href="channel.id"
                 target="_blank"
              >{{channel.type}}</a>
            </div>
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
      address: '',
    };
  },
  methods: {
    requestData() {
      const key = process.env.VUE_APP_API_KEY;
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
