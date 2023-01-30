import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './i18n/en';

const messages = {
    it: () => import('./i18n/it').then(messages => messages.default),
};

export default polyglotI18nProvider(
    locale => {
        if (locale === 'it') {
            return messages[locale]();
        }

        // Always fallback on english
        return englishMessages;
    },
    'en',
    [
        { locale: 'en', name: 'English' },
        { locale: 'it', name: 'Italian' },
        { locale: 'lv', name: 'Latvian' },
        { locale: 'es', name: 'Spanish' },
        { locale: 'de', name: 'German' },
    ]
);
