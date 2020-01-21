<template>
  <div class="flex flex-col justify-center items-center">
    <Ballot @back="stateSelected = false" v-if="stateSelected" type="dates" :title="primary.State">
      <div class="w-full">
        <!--Mail In-->
        <div class="deadline">
          <img class="icon" src="../images/svg/029-letter.svg" />
          <div class="deadline-info">
            <ul>
              <span class="deadline-headline">Mail In By:</span>
              <li class="list-item">
                <span class="text-pink-500 label">General:</span> {{ mailInDate }}
              </li>
              <li class="list-item"><span class="text-indigo-500 label">Primary:</span> TBD</li>
            </ul>
          </div>
        </div>

        <!--Dem Deadline-->
        <div class="deadline">
          <img class="icon" src="../images/svg/043-form.svg" />
          <div class="deadline-info">
            <ul>
              <span class="deadline-headline">Register Primary By:</span>
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
              <span class="deadline-headline">Vote Primary On:</span>
              <li
                :key="value"
                class="list-item"
                v-for="(value, key) in primary['Presidential Primary']"
              >
                <span class="label" :class="partyColor(key)"
                  >{{ presidentialPrimaryParty(key) }}: </span
                >{{ formatDate(value) }}
              </li>
            </ul>
          </div>
        </div>

        <!--State Primary Reg-->
        <!-- <p
          v-if="
            primary['State Primary Registration Date'] &&
              primary['State Primary Registration Date'] !== 'N/A'
          "
          class="mt-4 text-gray-700 font-bold"
        >
          State Primary Registration Date:
          {{ primary["State Primary Registration Date"] }}
        </p> -->

        <!--State Primary Date-->
        <!-- <p
          v-if="primary['State Primary'] && primary['State Primary'] !== 'N/A'"
          class="mt-4 text-gray-700 font-bold"
        >
          State Primary:
          {{ primary["State Primary"] }}
        </p> -->
      </div>
    </Ballot>
    <Ballot title="2020 Election Dates" type="search" v-else>
        <div class="my-20 w-full items-center flex flex-col justify-between">
          <p
            class="font-bold text-gray-700 text-xl text-center px-4 md:px-12 lg:px-24 mb-10 whitespace-pre-wrap"
          >
            Please enter a valid US residential address to receive your 2020 election registration
            and voting deadlines
          </p>
          <input
            @keyup.enter="requestData()"
            placeholder="Valid US Residential Address"
            class="search text-gray-700 border-gray-300 border py-2 px-4 w-10/12 md:w-2/4 rounded"
            type="text"
            v-model="address"
          />
          <span class="text-blue mt-4 font-bold" v-if="error">* {{error}} *</span>
          <button
            @click="requestData()"
            class="bg-red text-white font-bold tracking-wide rounded w-10/12 md:w-2/4 mt-8 py-2 px-4"
          >
            Retrieve Voter Information
          </button>
        </div>
      </Ballot>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import Ballot from './Ballot.vue';

export default {
  components: { Ballot },
  data() {
    return {
      address: '',
      stateSelected: false,
      error: null,
    };
  },
  methods: {
    async requestData() {
      const key = process.env.VUE_APP_API_KEY;
      const { address } = this;
      if (address) {
        try {
          const url = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${address}&key=${key}&electionId=2000`;
          await fetch(url)
            .then(resp => resp.json())
            .then(data => this.$store.dispatch('setData', data))
          this.stateSelected = true
          this.error = null
        } catch (err) {
          this.error = 'Invalid Search Address'
        }
      } else this.error = 'Must enter valid search address'
    },
    presidentialPrimaryParty(key) {
      return key === 'Caucus Date (D)' ? 'D' : 'R';
    },
    formatDate(date) {
      if (date && date !== 'N/A') {
        return new Date(date).toDateString();
      } return 'Date Unknown';
    },
    partyColor(key) {
      if (this.presidentialPrimaryParty(key) === 'D') {
        return 'text-blue';
      } return 'text-red';
    },
  },
  computed: mapState({
    primary: state => state.primary,
    stateSelected: state => state.userState,
    mailInDate() {
      return this.formatDate(this.primary['Federal Mail-in Registration Deadline']);
    },
    demRegDeadline() {
      return this.formatDate(this.primary['Presidential Primary Registration Deadline (D)']);
    },
    repRegDeadline() {
      return this.formatDate(this.primary['Presidential Primary Registration Deadline (R)']);
    },
  }),
};
</script>

<style lang="scss"></style>
