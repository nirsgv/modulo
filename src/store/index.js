import Vue from "vue";
import Vuex from "vuex";
import timeline from "@/store/timeline.js";
import patterns from "@/store/patterns.js";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const state = {
  isAndroid: false,
  isiPhone: false,
  isiPad: false,
  isChromeIos: false,
  isMobileApp: false,
  isMobile: false,
  isCordovaApp: false,
  isPane: false,
  angularOrigin: "",
  lang: "en",
  direction: "ltr",
  dialogStatus: {
    isOpen: false,
  },
  showLoader: false,
  windowLocation: false,
  dialogIndex: 0,
};

const mutations = {
  setIsAndroid(state, isAndroid) {
    state.isAndroid = isAndroid;
  },
  setIsiPhone(state, isiPhone) {
    state.isiPhone = isiPhone;
  },
  setIsiPad(state, isiPad) {
    state.isiPad = isiPad;
  },
  setChromeIos(state, isChromeIos) {
    state.isChromeIos = isChromeIos;
  },
  setMobileApp(state, isMobileApp) {
    state.isMobileApp = isMobileApp;
  },
  setMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
  setCordovaApp(state, isCordovaApp) {
    state.isCordovaApp = isCordovaApp;
  },
  setPane(state, isPane) {
    state.isPane = isPane;
  },
  setAngularOrigin(state, origin) {
    state.angularOrigin = origin;
  },
  setLang(state, lang) {
    state.lang = lang;
  },
  setDialogStatus(state, dialogStatus) {
    state.dialogStatus = dialogStatus;
  },
  setDirection(state, direction) {
    state.direction = direction;
  },
  setLoaderState(state, showLoader) {
    state.showLoader = showLoader;
  },
  setWindowLocation(state, value) {
    state.windowLocation = value;
  },
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
  isiPhone: function (state) {
    return state.isiPhone;
  },
  isiPad: function (state) {
    return state.isiPad;
  },
  isChromeIos: function (state) {
    return state.isChromeIos;
  },
  isMobileApp: function (state) {
    return state.isMobileApp;
  },
  isIosMobileApp: function (state) {
    return (state.isiPhone || state.isiPad) && state.isMobileApp;
  },
  isIOS: function (state) {
    return state.isiPhone || state.isiPad;
  },
  isMobile: function (state) {
    return state.isMobile;
  },
  isCordovaApp: function (state) {
    return state.isCordovaApp;
  },
  isPane: function (state) {
    return state.isPane;
  },
  angularOrigin: function (state) {
    return state.angularOrigin;
  },
  isSmallScreen: function (state) {
    return state.isMobile || state.isMobileApp;
  },
  lang: function (state) {
    return state.lang;
  },
  direction: function (state) {
    return state.direction;
  },
  platform: function (state) {
    return state.isMobileApp
      ? "mobileApp"
      : state.isMobile
      ? "mobile"
      : "desktop";
  },
  isRightToLeft: function (state) {
    return state.direction === "rtl";
  },
  vcitaWindowLocation: function (state) {
    return state.windowLocation.includes("vcita");
  },
  dialogStatus: (state) => state.dialogStatus,
  showLoader: (state) => state.showLoader,
  dialogIndex: (state) => state.dialogIndex,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    timeline,
    patterns
  },
  strict: debug,
});
