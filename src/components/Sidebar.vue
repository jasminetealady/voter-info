<template>
  <div class="bg-white border-l w-full xl:w-1/2">
    <!--Mail In-->
    <div v-if="!registered" class="deadline">
      <img class="icon" src="../images/svg/029-letter.svg" />
      <div class="deadline-info">
        <ul>
          <span class="GrayHeader mb-4">Mail In By:</span>
          <li class="list-item">
            <span class="text-pink-500 label">General:</span>
            {{ mailInDate }}
          </li>
          <li class="list-item">
            <span class="text-indigo-500 label">Primary:</span> Unknown
          </li>
        </ul>
      </div>
    </div>

    <!--Dem Deadline-->
    <div v-if="!registered" class="deadline">
      <img class="icon" src="../images/svg/043-form.svg" />
      <div class="deadline-info">
        <ul>
          <span class="GrayHeader mb-4">Register Primary By:</span>
          <li class="list-item">
            <span class="label" :class="{ 'text-blue': demRegDeadline }">D:</span>
            {{ demRegDeadline }}
          </li>
          <li class="list-item">
            <span class="label" :class="{ 'text-red': repRegDeadline }">R:</span>
            {{ repRegDeadline }}
          </li>
        </ul>
      </div>
    </div>

    <!--Vote By-->

    <div class="deadline">
      <img class="icon" src="../images/svg/046-vote.svg" />
      <div class="deadline-info">
        <ul>
          <span class="GrayHeader mb-4">Vote Primary On:</span>
          <li
            :key="value"
            class="list-item"
            v-for="(value, key) in primary['Presidential Primary']"
          >
            <span class="label" :class="partyColor(key)">{{ presidentialPrimaryParty(key) }}:</span>
            {{ formatDate(value) }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="registered" class="deadline flex-col">
      <h3 class="GrayHeader">Your Poll Locations:</h3>
      <p class="label text-red mt-4">
        All data for Polling Locations is sourced from the
        <a
          class="hover:text-blue inline-flex whitespace-no-wrap"
          href="https://developers.google.com/civic-information"
        >Google Civic Info API</a>. There is no data for an active election at this time. Please check back again soon!
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    primary: state => state.primary,
    registered: state => state.registered,
    mailInDate() {
      return this.formatDate(
        this.primary['Federal Mail-in Registration Deadline']
      )
    },
    demRegDeadline() {
      return this.formatDate(
        this.primary['Presidential Primary Registration Deadline (D)']
      )
    },
    repRegDeadline() {
      return this.formatDate(
        this.primary['Presidential Primary Registration Deadline (R)']
      )
    }
  }),
  methods: {
    presidentialPrimaryParty(key) {
      return key === 'Caucus Date (D)' ? 'D' : 'R'
    },
    formatDate(date) {
      if (date && date !== 'N/A') {
        return new Date(date).toDateString()
      }
      return 'N/A'
    },
    partyColor(key) {
      if (this.presidentialPrimaryParty(key) === 'D') {
        return 'text-blue'
      }
      return 'text-red'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
