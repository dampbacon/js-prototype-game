//from https://github.com/astefanutti/kubebox
require('./element.cjs');
require('./list.cjs');
require('./listbar.cjs');
require('./listtable.cjs');
require('./node.cjs');
require('./screen.cjs');
require('./table.cjs');
require('./textarea.cjs');

const blessed = require('blessed');

blessed.with = function (...fns) {
  return new Proxy(blessed, {
    get: function (target, method) {
      return function (...args) {
        const el = Reflect.apply(target[method], target, args);
        return fns.reduce((e, fn) => fn.call(null, e) || e, el);
      };
    },
  });
};

blessed.element.prototype.with = function (...fns) {
  return fns.reduce((e, fn) => fn.call(null, e) || e, this);
};
