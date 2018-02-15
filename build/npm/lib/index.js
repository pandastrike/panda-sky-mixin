"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templater = require("./templater");

var _templater2 = _interopRequireDefault(_templater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mixin;

Mixin = class Mixin {
  constructor(config) {
    var templateConfig;
    ({ getPolicyStatements: this.getPolicyStatements, getEnvironmentVariables: this.getEnvironmentVariables, schema: this.schema, template: this.template, preprocess: this.preprocess, cli: this.cli, name: this.name } = config);
    this.getPolicyStatements || (this.getPolicyStatements = function () {
      return [];
    });
    this.getEnvironmentVariables || (this.getEnvironmentVariables = function () {
      return {};
    });
    this.cli || (this.cli = false);
    this.getMixinConfig = function (n) {
      return n.aws.environments[n.env].mixins[this.name];
    };
    this.preprocess || (this.preprocess = this.getMixinConfig);
    templateConfig = {
      name: this.name,
      getMixinConfig: this.getMixinConfig,
      template: this.template,
      schema: this.schema,
      preprocess: this.preprocess
    };
    this.T = new _templater2.default(templateConfig);
  }

  registerPartial(name, template) {
    return this.T.registerPartial(name, template);
  }

  render(AWS, config) {
    return this.T.render(AWS, config);
  }

};

exports.default = Mixin;