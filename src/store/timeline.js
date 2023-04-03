import { WebMidi } from "webmidi";

// The BPM to MS Formula
// The formula is pretty simple, but it can be annoying to calculate over and over again.

// 1 Minute = 60,000 milliseconds (ms)

// To get the duration of a quarter note (a quarter note = 1 beat) for any tempo/BPM we divide the number of milliseconds per minute by the BPM. So:

// 60,000 (ms) ÷ BPM = duration of a quarter note

// Example:
// 60,000 ÷ 140 BPM = 428.57 ms per beat/quarter note.

const MINUTE_MS_AMT = 60000; //ms

const state = {
  running: false,
  bars: 16,
  barLength: 64,
  pointer: 0,
  bpm: 120,
  timerID: null,
  channel: null,
};

const getters = {
  bpm: (state) => state.bpm,
  barLength: (state) => state.barLength,
  pointer: (state) => state.pointer,
  isRunning: (state) => state.running,
  timerID: (state) => state.timerID,
  barNoteDuration: (state) => (MINUTE_MS_AMT / state.bpm) * 4,
  quarterNoteDuration: (state) => MINUTE_MS_AMT / state.bpm,
  eightNoteDuration: (state) => MINUTE_MS_AMT / state.bpm / 2,
  sixteenthNoteDuration: (state) => MINUTE_MS_AMT / state.bpm / 4,
  thirtyTwothNoteDuration: (state) => MINUTE_MS_AMT / state.bpm / 8,
  sixtyFourthNoteDuration: (state) => MINUTE_MS_AMT / state.bpm / 16,
  tenTwentyFourthNoteDuration: (state) => MINUTE_MS_AMT / state.bpm / 32,
};

const mutations = {
  INNIT: (state, channel) => {
    state.channel = channel;
  },
  PLAY_NOTE: (state) => {
    state.channel.playNote("C3", 25, 0.5);
  },
  SET_INTERVAL: (state, interval) => {
    state.timerID = interval;
  },

  SET_BPM: (state, bpm) => {
    state.bpm = bpm;
  },
  SET_RUNNING: (state, run) => {
    state.running = run;
  },
  FOTWARD_TIME: (state) => {
    state.pointer += 1;
  },
  STOP_RUNNING: (state) => {
    state.running = false;
    clearInterval(state.timerID);
    state.timerID = null;
  },
  START_RUNNING: (state) => {
    state.running = true;
  },
};

const actions = {
  initTimer: ({ commit }) => {
    const output = WebMidi.getOutputByName(WebMidi.outputs[0].name);
    const channel = output.channels[1];
    if (!state.channel) {
      commit("INNIT", channel);
    }
  },
  setBpm: ({ commit }, { bpm }) => {
    commit("SET_BPM", bpm);
  },
  setRunning: ({ commit }, { run }) => {
    commit("SET_RUNNING", run);
  },
  stopRunning: ({ commit }) => {
    commit("STOP_RUNNING");
  },
  startRunning: ({ commit }, interval) => {
    // eslint-disable-next-line no-debugger
    commit("SET_RUNNING", true);
    if (!interval) {
      interval = setInterval(() => {
        commit("PLAY_NOTE");
        commit("FOTWARD_TIME");
        console.log(MINUTE_MS_AMT / state.bpm / 16);
      }, MINUTE_MS_AMT / state.bpm / 16);
    }
    commit("SET_INTERVAL", interval);
  },
  toggleRunning: ({ commit }) => {
    if (!state.running) {
      commit("START_RUNNING");
    } else {
      commit("STOP_RUNNING");
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
