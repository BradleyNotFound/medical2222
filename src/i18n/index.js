import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './lang/en';
import zh from './lang/zh';

Vue.use(VueI18n);
const messages = { en, zh };

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
