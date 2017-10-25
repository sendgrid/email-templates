For the purposes of accessibility, any input element of type text or radio (`<input type="text">, <input type="radio">`) should have an associated label. The label can be placed in one of two ways:
* as a parent of the input element. (Wrapping)
* using the `for` attribute with a value matching the input's `id` attribute.

If the latter is used and the type is text, the `for` attribute may match the `name` attribute of the input instead.

If the latter is used, it must be a one-to-one match in values.