import Templater from "./templater"

class Mixin
  constructor: (config) ->
    {@getPolicyStatements, @schema, @template, @preprocess, @cli, @name} = config
    @getPolicyStatements ||=  []
    @cli ||= false

    @getMixinConfig = (n) -> n.aws.environments[n.env].mixins[@name]
    @preprocess ||= @getMixinConfig

    templateConfig =
      name: @name
      getMixinConfig: @getMixinConfig
      template: @template
      schema: @schema
      preprocess: @preprocess

    @T = new Templater templateConfig


  registerPartial: (name, template) ->
    @T.registerPartial name, template

  render: (AWS, config) ->  @T.render AWS, config


export default Mixin
