import Templater from "./templater"

class Mixin
  constructor: (config) ->
    {@policyStatements, @schema, @template, @preprocess, @cli, @name} = config
    @policyStatements ||=  []
    @cli ||= false

    @getMixinConfig = (n) -> n.aws.environments[n.env].mixins[@name]
    @preprocess ||= @getMixinConfig

    @T = new Templater @name, @getMixinConfig, @template, @schema


  registerPartial: (name, template) ->
    @T.registerPartial name, template

  render: (config) ->  @T.render @preprocess, config


export default Mixin
