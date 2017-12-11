import Templater from "./templater"

class Mixin
  constructor: (config) ->
    {@policyStatements, @schema, @template, @preprocess, @cli, @name} = config
    @policyStatements ||=  []
    @preprocess || (n) -> n
    @cli ||= false
    @T = new Templater @name, @template, @schema

  registerPartial: (name, template) ->
    @T.registerPartial name, template

  render: (config) ->  @T.render @preprocess, config


export default Mixin
