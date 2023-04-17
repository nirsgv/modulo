import { Note } from "webmidi";
import { Pattern, Track } from "@/helpers/index.js";
const state = {
  patterns: {},
  selectedPatternUid: "",
  clipboardPatternSlot: null,
};

const getters = {
  patterns: (state) => state.patterns,
  pattern: (state) => state.patterns[state.selectedPatternUid],
  selectedPatternUid: (state) => state.selectedPatternUid,
};

const mutations = {
  CREATE_EMPTY_PATTERN: (state, { uid = null }) => {
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[uid] = new Pattern({ uid });
    state.patterns = newPatterns;
  },
  SAVE_PATTERN: (state, { pattern, uid }) => {
    if (!uid) return;
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[uid] = pattern || new Pattern({ uid });
    state.patterns = newPatterns;
  },
  SET_SELECTED_PATTERN: (state, { uid }) => {
    state.selectedPatternUid = uid;
  },
  TOGGLE_BOX: (state, { channelUid, patternUid, bIdx }) => {
    const cPattern = window.structuredClone(state.patterns[patternUid]);
    if (!cPattern[channelUid]) cPattern[channelUid] = new Track();
    if (cPattern[channelUid].noteEvents[`b-${bIdx}`]) {
      cPattern[channelUid].noteEvents[`b-${bIdx}`] = null;
    } else {
      cPattern[channelUid].noteEvents[`b-${bIdx}`] = new Note(60, {
        rawAttack: 127,
        rawRelease: 127,
      });
    }
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[patternUid] = cPattern;
    state.patterns = newPatterns;
  },
  ADD_TRACK: (state, { track }) => {
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[state.selectedPatternUid].tracks.push(track);
    state.patterns = newPatterns;
  },
  REMOVE_TRACK: (state, { trackUid }) => {
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[state.selectedPatternUid].tracks = newPatterns[
      state.selectedPatternUid
    ].tracks.filter((track) => track.uid !== trackUid);
    state.patterns = newPatterns;
  },
  COPY_PATTERN: (state) => {
    state.clipboardPatternSlot = window.structuredClone(
      state.patterns[state.selectedPatternUid]
    );
  },
  PASTE_PATTERN: (state) => {
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[state.selectedPatternUid] = state.clipboardPatternSlot;
    state.patterns = newPatterns;
  },
  CHANGE_PATTERN_TITLE: (state, { val }) => {
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[state.selectedPatternUid].name = val;
    state.patterns = newPatterns;
  },
  CHANGE_TRACK_TITLE: (state, { val, trackUid }) => {
    const newPatterns = window.structuredClone(state.patterns);
    newPatterns[state.selectedPatternUid].tracks = newPatterns[
      state.selectedPatternUid
    ].tracks.map((t) => (t.uid !== trackUid ? t : { ...t, name: val }));
    state.patterns = newPatterns;
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
  toggleBox: ({ commit }, { channelUid, patternUid, bIdx }) => {
    commit("TOGGLE_BOX", { channelUid, patternUid, bIdx });
  },
  addTrack: ({ commit }) => {
    const track = new Track();
    commit("ADD_TRACK", { track });
  },
  removeTrack: ({ commit }, { trackUid }) => {
    commit("REMOVE_TRACK", { trackUid });
  },
  copyPattern: ({ commit }) => {
    commit("COPY_PATTERN");
  },
  pastePattern: ({ commit }) => {
    commit("PASTE_PATTERN");
  },
  changePatternTitle: ({ commit }, { val }) => {
    commit("CHANGE_PATTERN_TITLE", { val });
  },
  changeTrackTitle: ({ commit }, { val, trackUid }) => {
    commit("CHANGE_TRACK_TITLE", { val, trackUid });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
