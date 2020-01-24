<template>
  <div class="w-full">
    <div class="w-full" v-if="data.contests && seeSampleData">
      <div
        :key="index"
        v-for="(contest, index) in data.contests"
        class="w-full text-center Contest"
      >
        <div
          v-if="contest.office"
          class="bg-lightblue w-full justify-center items-center flex flex-col mb-10"
        >
          <div class="my-4">
            <h1 class="text-red text-2xl font-bold capitalize">{{ contest.office}}</h1>
            <h2
              class="text-gray-700 text-lg font-bold capitalize"
            >{{ contest.district && contest.district.name !== userState ? contest.district.name : '' }}</h2>
          </div>
        </div>

        <!--Candidates-->

        <div class="w-full justify-center Contest-Grid">
          <div :key="candidate.party" class="Candidate" v-for="candidate in contest.candidates">
            <!--Name-->
            <a class="block w-full" target="_blank" :href="candidate.candidateUrl">
              <p
                :class="partyColorBg(candidate.party)"
                class="text-xl text-white font-bold py-2 capitalize"
              >{{ candidate ? candidate.name : '' }}</p>

              <div class="py-8">
                <!--Party-->
                <p
                  :class="partyColor(candidate.party)"
                  class="text-xl font-bold mb-4 capitalize"
                >{{ candidate ? candidate.party + ' Party' : '' }}</p>

                <!--Phone-->
                <!-- <a
                  v-if="candidate.phone"
                  class="text-3xl cursor-pointer block"
                  :href="`tel:+1-${candidate.phone}`"
                  target="_blank"
                >
                  <span class="text-xl font-bold">{{candidate.phone}}</span>
                </a>-->

                <!--Email-->
                <!-- <a
                v-if="candidate.email"
                class="text-gray-700 text-3xl cursor-pointer"
                :href="`mailto:${candidate.email}`"
                target="_blank"
              >
                <Icon :icon="['fas', 'envelope']" />
                </a>-->

                <!--Socials-->

                <div class="flex w-full items-center justify-center">
                  <a
                    :class="partyColor(candidate.party)"
                    class="text-xl cursor-pointer"
                    :key="channel.type"
                    v-for="channel in candidate.channels"
                    :href="channel.id"
                    target="_blank"
                  >
                    <Icon class="mx-4" :icon="['fab', icon(channel.type)]" />
                  </a>
                </div>
              </div>
              <!--End-->
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="mt-6 ContestsError flex flex-col text-red">
      <p class="label">
        All data for Contests and Candidates is sourced from the
        <a
          class="hover:text-blue inline-flex whitespace-no-wrap"
          href="https://developers.google.com/civic-information"
        >Google Civic Info API.</a> There is no data for an active election at this time. Please check back again soon!
      </p>
      <a
        v-if="!seeSampleData && data.contests"
        href="#"
        @click.prevent="seeSampleData = true"
        class="mt-10 mb-20 block bg-red text-white font-bold tracking-wide rounded w-auto p-2 cursor-pointer text-center"
      >See Sample Data</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      seeSampleData: false
    }
  },
  methods: {
    partyColor(party) {
      if (party === 'Republican') {
        return 'text-red'
      }
      if (party === 'Democratic') {
        return 'text-blue'
      }
      if (party === 'Independent') {
        return 'text-purple'
      }
      return 'text-green'
    },
    partyColorBg(party) {
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
    icon(type) {
      const lowercased = type.toLowerCase()

      if (lowercased === 'twitter') {
        return 'twitter'
      }
      if (lowercased === 'facebook') {
        return 'facebook'
      }
      if (lowercased === 'website') {
        return 'website'
      }
      if (lowercased === 'youtube') {
        return 'youtube'
      }
      if (lowercased === 'phone') {
        return 'phone'
      }
    }
  },
  computed: mapState({
    data: state => state.data,
    userState: state => state.userState
  })
}
</script>

<style lang="scss" scoped>
</style>
