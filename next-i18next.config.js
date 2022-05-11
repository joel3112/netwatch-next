// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  i18n: {
    locales: ['es-ES'],
    defaultLocale: 'es-ES'
  },
  reloadOnPrerender: true,
  localePath: path.resolve('./public/locales')
};
