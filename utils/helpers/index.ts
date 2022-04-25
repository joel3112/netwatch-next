import * as utilsArray from '@/utils/helpers/array';
import * as utilsString from '@/utils/helpers/string';
import utilsObject from '@/utils/helpers/object';
import utilsSize from '@/utils/helpers/size';

const helpers = {
  ...utilsArray,
  ...utilsString,
  ...utilsObject,
  ...utilsSize
};

export default helpers;
