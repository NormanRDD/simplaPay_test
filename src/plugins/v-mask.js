import Vue from "vue";
import VueMask from "v-mask";

Vue.use(VueMask, {
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
});
