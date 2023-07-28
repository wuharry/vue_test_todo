declare module '*.vue' {
    import { defineComponent } from 'vue';
    import Vue from 'vue'
    const component: ReturnType<typeof defineComponent>;
    export default Vue
    // export default {component};
  }
  