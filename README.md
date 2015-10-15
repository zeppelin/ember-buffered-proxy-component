# Ember BufferedProxy Component [![Build Status](https://travis-ci.org/zeppelin/ember-buffered-proxy-component.svg)](https://travis-ci.org/zeppelin/ember-buffered-proxy-component) [![Ember Observer Score](http://emberobserver.com/badges/ember-buffered-proxy-component.svg)](http://emberobserver.com/addons/ember-buffered-proxy-component)

An Ember Component that uses [BufferedProxy](https://github.com/yapplabs/ember-buffered-proxy)
to enable change buffering at the view level.

## Usage

```hbs
{{model.name}}

{{#buffered-proxy content=model as |content apply discard hasChanges|}}
  {{content.name}} (Has changes: {{hasChanges}})
  
  {{input value=content.name}}

  <button {{action apply}}>Apply</button>
  <button {{action discard}}>Discard</button>
{{/buffered-proxy}}
```

Using `{{buffered-proxy}}`s block param, `content.name` gets disconnected from
`model.name`, once it's changed and the changes hasn't been applied back to the
outer context. Firing a `discard` action resets the proxy value. Check out
[the tests](tests/integration/components/buffered-proxy-test.js) for more info.


## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
