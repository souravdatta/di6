module.exports = {
  DI: function () {
    this._object = null;

    this.forClass = function (klass) {
      this._object = new klass();
      return this;
    };

    this.inject = function (config) {
      for (k in config) {
        if (config.hasOwnProperty(k)) {
          this._object[k] = config[k];
        }
      }
      return this;
    };

    this.applyParams = function (fn, params) {
      return fn.apply(null, params);
    };

    this.construct = function (args) {
      this._object.constructor.apply(this._object, args);
      return this;
    };

    this.getObject = function () {
      return this._object;
    }
  }
};
