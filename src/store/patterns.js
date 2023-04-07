import { Pattern } from "@/helpers/index.js";
const state = {
  patterns: {},
  selectedPatternUid: "",
};

const getters = {
  patterns: (state) => state.patterns,
  pattern: (state) => state.patterns[state.selectedPatternUid],
};

const mutations = {
  CREATE_EMPTY_PATTERN: (state, { uid = null }) => {
    const newPatterns = { ...state.patterns };
    newPatterns[uid] = new Pattern({ uid });
    state.patterns = newPatterns;
  },
  SAVE_PATTERN: (state, { pattern, uid }) => {
    if (pattern && uid) {
      const newPatterns = { ...state.patterns };
      newPatterns[uid] = pattern;
      state.patterns = newPatterns;
    }
  },
  SET_SELECTED_PATTERN: (state, { uid }) => {
    state.selectedPatternUid = uid;
  },
};

const actions = {
  createEmptyPattern: ({ commit }, uid) => {
    commit("CREATE_EMPTY_PATTERN", uid);
  },
  savePattern: ({ commit }, { pattern, uid }) => {
    commit("SAVE_PATTERN", { pattern, uid });
  },
  setSelectedPattern: ({ commit }, { uid }) => {
    commit("SET_SELECTED_PATTERN", { uid });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
