# Panda Sky Mixin
_Base Interface for the Various Panda Sky Mixins_

## Interface
This exists to abstract out the interface commonalities from each Sky mixin, so those modules just need the schema / configuration that makes them unique.  The primary components of each mixin are:

- Accept configuration from the Sky Core.
- Accept mixin-specific configuration, pulled from each environment's `mixin` dictionary within the `sky.yaml` file.
- Validate that configuration through the use of JSON schema and `jsck`.
- Return:
  - A rendered CloudFormation pattern to concatenate with the Core Sky pattern
  - A declaration of Lambda access to AWS resources the handlers need
- Sky CLI extension interface
