import Templater from "./templater"

class Mixin
  constructor: (config) ->
    {@policyStatements, @schema, @template, @preprocess, @cli} = config
    @policyStatements ||=  []
    @preprocess ||= (n) -> n
    @cli ||= false

    @T = new Templater @template, @schema

  registerPartial: @T.registerPartial
  render: (config) ->  @T.render await @preprocess config


export default Mixin
