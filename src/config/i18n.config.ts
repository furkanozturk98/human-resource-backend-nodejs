import i18n from 'i18n';
import path from 'path';

i18n.configure({
    locales        : ['en'],
    defaultLocale  : 'en',
    queryParameter : 'lang',
    directory      : path.join('./src', 'locales'),
    api            : {
        '__'  : 'translate',
        '__n' : 'translateN'
    },
});
i18n.setLocale('en')

export default i18n;