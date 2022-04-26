import * as _ from 'lodash';

declare global {
  interface String {
    truncate(limit: number): string;
    toCamelCase(): string;
    toKebabCase(): string;
    removeSpecialCharacters(): string;
    isUrl(): boolean;
    toBackgroundImageUrl(): string;
  }
}

String.prototype.truncate = function (limit: number) {
  return _.truncate(String(this), { length: limit, separator: ' ' });
};

String.prototype.toCamelCase = function () {
  return _.camelCase(String(this));
};

String.prototype.toKebabCase = function () {
  return _.kebabCase(String(this));
};

String.prototype.removeSpecialCharacters = function () {
  return String(this)
    .replace(/[ÂÀÅÃ]/g, 'A')
    .replace(/[âàåã]/g, 'a')
    .replace(/Ä/g, 'AE')
    .replace(/ä/g, 'ae')
    .replace(/Ç/g, 'C')
    .replace(/ç/g, 'c')
    .replace(/[ÉÊÈË]/g, 'E')
    .replace(/[éêèë]/g, 'e')
    .replace(/[ÓÔÒÕØ]/g, 'O')
    .replace(/[óôòõ]/g, 'o')
    .replace(/Ö/g, 'OE')
    .replace(/ö/g, 'oe')
    .replace(/ñ/, 'n')
    .replace(/Š/g, 'S')
    .replace(/š/g, 's')
    .replace(/ß/g, 'ss')
    .replace(/[ÚÛÙ]/g, 'U')
    .replace(/[úûù]/g, 'u')
    .replace(/Ü/g, 'UE')
    .replace(/ü/g, 'ue')
    .replace(/[ÝŸ]/g, 'Y')
    .replace(/[ýÿ]/g, 'y')
    .replace(/Ž/g, 'Z')
    .replace(/ž/, 'z')
    .replace(/[^a-zA-Z0-9 ]/g, '');
};

String.prototype.isUrl = function () {
  return /^(?:(?:https?|ftp):)?\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.[a-z\u00a1-\uffff]{2,})(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    String(this)
  );
};

String.prototype.toBackgroundImageUrl = function () {
  return this && this.isUrl() ? `url(${String(this)})` : '';
};
