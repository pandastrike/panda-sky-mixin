import JSCK from "jsck"
import {yaml} from "panda-serialize"
import PandaTemplate from "panda-template"

class Templater
  constructor: (@name, @template, @schema) ->
    @validator = new JSCK.draft4 @schema if @schema
    @T = new PandaTemplate()

  registerPartial: (name, template) ->
    @T.registerPartial name, template if @template

  # If this mixin has no template, return an empty object. If there is no schema don't try to validate. Validate only the mixin configuration, but give all configuraiton to the preprocessor to make it as flexible as possible.
  render: (preprocess, config) ->
    if @template
      mixinConfig = config.aws.environments[config.env].mixins?[@name]
      @validate mixinConfig if @schema
      config = await preprocess config
      yaml @T.render @template, config
    else
      {}

  validate: (config) ->
    {valid, errors} = @validator.validate config
    if not valid
      console.error errors
      throw new Error()
    config

export default Templater
