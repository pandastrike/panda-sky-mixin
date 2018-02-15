"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsck = require("jsck");

var _jsck2 = _interopRequireDefault(_jsck);

var _pandaSerialize = require("panda-serialize");

var _pandaTemplate = require("panda-template");

var _pandaTemplate2 = _interopRequireDefault(_pandaTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Templater;

Templater = class Templater {
  constructor({
    name: name1,
    getMixinConfig: getMixinConfig,
    template: template1,
    schema: schema,
    preprocess: preprocess
  }) {
    this.name = name1;
    this.getMixinConfig = getMixinConfig;
    this.template = template1;
    this.schema = schema;
    this.preprocess = preprocess;
    if (this.schema) {
      this.validator = new _jsck2.default.draft4(this.schema);
    }
    this.T = new _pandaTemplate2.default();
  }

  registerPartial(name, template) {
    if (this.template) {
      return this.T.registerPartial(name, template);
    }
  }

  // If this mixin has no template, return an empty object. If there is no schema don't try to validate. Validate only the mixin configuration, but give all configuraiton to the preprocessor to make it as flexible as possible.
  render(AWS, config) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var mixinConfig;
      if (_this.template) {
        mixinConfig = _this.getMixinConfig(config);
        if (_this.schema) {
          _this.validate(mixinConfig);
        }
        config = yield _this.preprocess(AWS, config);
        return (0, _pandaSerialize.yaml)(_this.T.render(_this.template, config));
      } else {
        return {};
      }
    })();
  }

  validate(config) {
    var errors, valid;
    ({ valid, errors } = this.validator.validate(config));
    if (!valid) {
      console.error(errors);
      throw new Error();
    }
    return config;
  }

};

exports.default = Templater;