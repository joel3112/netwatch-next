module.exports = {
  '**/*.(ts|tsx)': () => 'yarn type-check',

  '**/*.(ts|tsx|js|jsx)': (filenames) => [
    `yarn lint --fix . ${filenames.join(' ')}`,
    `yarn format ${filenames.join(' ')}`
  ],

  '**/*.(css|scss)': (filenames) => [
    `yarn stylelint --fix ${filenames.join(' ')}`,
    `yarn format ${filenames.join(' ')}`
  ],

  '**/*.(md|json)': (filenames) => `yarn format ${filenames.join(' ')}`
};
