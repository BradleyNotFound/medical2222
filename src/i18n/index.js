import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import en from './lang/en';
import zh from './lang/zh';

Vue.use(VueI18n);
const messages = {
  en: { ...enLocale, ...en },
  zh: { ...zhLocale, ...zh }
};

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
