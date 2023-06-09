import Vue from "vue";
import Vuex from "vuex";
import timeline from "@/store/timeline.js";
import patterns from "@/store/patterns.js";
import midi_setup from "@/store/midi_setup.js";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const state = {
  angularOrigin: "",
  lang: "en",
  direction: "ltr",
  dialogStatus: {
    isOpen: false,
  },
  showLoader: false,
};

const mutations = {
  increaseDialogIndex(state) {
    state.dialogIndex++;
  },
  decreaseDialogIndex(state) {
    state.dialogIndex--;
  },
};

const actions = {
  initWindowLocation: ({ commit }) => {
    commit("setWindowLocation", window.app_config.frontage_location);
  },
};

const getters = {
  isAndroid: function (state) {
    return state.isAndroid;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    midi_setup,
    timeline,
    patterns,
  },
  strict: debug,
});
