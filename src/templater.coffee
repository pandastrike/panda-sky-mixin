import JSCK from "jsck"
import {yaml} from "panda-serialize"
import PandaTemplate from "panda-template"

class Templater
  constructor: (@template, @schema) ->
    @validator = new JSCK.draft4 @schema if @schema
    @T = new pandaTemplate()

  registerPartial: (name, template) ->
    @T.registerPartial name, template if @template

  # If this mixin has no template, return an empty object. If there is no schema
  # don't try to validate.
  render: (config) ->
    if @template
      @validate config if @schema
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
