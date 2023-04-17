/* eslint-disable no-debugger */
import { WebMidi } from "webmidi";
const state = {
  enabled: false,
  inputs: {},
  outputs: {},
};

const getters = {
  inputs: (state) =>
    Object.values(state.inputs).map(
      (input) =>
        `Type: ${input.type} Name: ${input.manufacturer} ${input.name} State: ${input.state} ${input.connection}`
    ),
  outputs: (state) =>
    Object.values(state.outputs).map(
      (input) =>
        `Type: ${input.type} Name: ${input.manufacturer} ${input.name} State: ${input.state} ${input.connection}`
    ),
};

const mutations = {
  INIT_MIDI_INTERFACE: (state) => {
    state.enabled = true;
  },
  SET_INPUTS: (state, { inputs }) => {
    console.log(inputs);
    state.inputs = inputs;
  },
  SET_OUTPUTS: (state, { outputs }) => {
    state.outputs = outputs;
    console.log(state);
  },
};

const actions = {
  initMidiInterface: ({ commit }) => {
    const onEnabled = () => {
      commit("INIT_MIDI_INTERFACE");
      commit("SET_INPUTS", { inputs: WebMidi.inputs });
      commit("SET_OUTPUTS", { outputs: WebMidi.outputs });
    };
    WebMidi.enable()
      .then(onEnabled)
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
