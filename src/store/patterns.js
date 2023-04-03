import { Pattern } from "@/helpers/index.js";
const state = {
  patterns: {},
};

const getters = {
  patterns: (state) => state.patterns,
};

const mutations = {
  CREATE_EMPTY_PATTERN: (state, { uid = null }) => {
    const pattern = new Pattern({ uid });
    console.log(pattern);
  },
  SAVE_PATTERN: (state, { pattern, uid }) => {
    if (pattern && uid) {
      const newPatterns = { ...state.patterns };
      newPatterns[uid] = pattern;
      state.patterns = newPatterns;
    }
  },
};

const actions = { 
  createEmptyPattern: ({ commit }, uid) => {
    commit("CREATE_EMPTY_PATTERN", uid);
  },
  savePattern: ({ commit }, { pattern, uid }) => {
    commit("SAVE_PATTERN", { pattern, uid });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
