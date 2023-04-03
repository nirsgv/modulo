import Vue from "vue";
import Vuetify, {
  VAlert,
  VApp,
  VAutocomplete,
  VAvatar,
  VBtn,
  VBtnToggle,
  VCard,
  VCardActions,
  VCheckbox,
  VChip,
  VCombobox,
  VDatePicker,
  VDialog,
  VDivider,
  VExpansionPanel,
  VExpansionPanelContent,
  VExpansionPanelHeader,
  VExpansionPanels,
  VForm,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemContent,
  VListItemGroup,
  VListItemIcon,
  VListItemSubtitle,
  VListItemTitle,
  VMenu,
  VNavigationDrawer,
  VProgressCircular,
  VRadio,
  VRadioGroup,
  VSelect,
  VSkeletonLoader,
  VSnackbar,
  VSpacer,
  VSwitch,
  VTab,
  VTabItem,
  VTabs,
  VTabsItems,
  VTextarea,
  VTextField,
  VTooltip,
  VContainer,
  VRow,
  VCol,
  VBadge,
  VCardTitle,
  VCardText,
  VHover,
  VDatePickerHeader,
} from "vuetify/lib";
import "vuetify/src/styles/main.sass";

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VCardActions,
    VLayout,
    VList,
    VDivider,
    VDialog,
    VMenu,
    VTextField,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAction,
    VListItemContent,
    VListItemGroup,
    VSnackbar,
    VProgressCircular,
    VBtn,
    VIcon,
    VImg,
    VSkeletonLoader,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VTabs,
    VTabsItems,
    VTab,
    VTabItem,
    VTooltip,
    VNavigationDrawer,
    VCheckbox,
    VAvatar,
    VChip,
    VSelect,
    VForm,
    VCombobox,
    VSpacer,
    VDatePicker,
    VAutocomplete,
    VTextarea,
    VListItemAvatar,
    VListItemIcon,
    VBtnToggle,
    VAlert,
    VSwitch,
    VRadio,
    VRadioGroup,
    VContainer,
    VRow,
    VCol,
    VBadge,
    VCardTitle,
    VCardText,
    VHover,
    VDatePickerHeader,
  },
});

export default new Vuetify({
  icons: {
    iconfont: "md",
    rtl: false,
  },
  theme: {
    dark: false,
    options: {
      customProperties: true, // allow create css variables based on the theme
    },
    themes: {
      light: {
        primary: "#0C315E", // represents the secondary color on DB
        secondary: {
          // represents the primary color on DB
          base: "#00dcf7",
          lighten1: "#99f1fc",
          lighten2: "#c2f7fd",
          lighten3: "#e0fbfe",
        },
      },
    },
  },
});