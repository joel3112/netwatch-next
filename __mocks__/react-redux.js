/* eslint-disable @typescript-eslint/no-var-requires */
const reactRedux = require('react-redux');

module.exports = {
  ...reactRedux,
  useSelector: jest.fn().mockImplementation(() => ({ theme: {}, scrollTo: {} })),
  useDispatch: jest.fn().mockImplementation(() => jest.fn())
};
