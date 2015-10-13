import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('buffered-proxy', 'Integration | Component | buffered proxy', {
  integration: true
});

test('smoke test', function(assert) {
  assert.expect(15);

  this.set('model', {
    name: 'Ferdinand'
  });

  this.render(hbs`
    <span class="outer-value">{{model.name}}</span>

    {{#buffered-proxy content=model as |content apply discard hasChanges|}}
      {{input value=content.name}}
      <span class="inner-value">{{content.name}}</span>
      <span class="has-changes">{{hasChanges}}</span>

      <button {{action apply}} class="apply-button">Apply</button>
      <button {{action discard}} class="discard-button">Discard</button>
    {{/buffered-proxy}}
  `);

  assert.equal(this.$('.outer-value').text().trim(), 'Ferdinand');
  assert.equal(this.$('.inner-value').text().trim(), 'Ferdinand');
  assert.equal(this.$('.has-changes').text().trim(), 'false');

  this.$('input').val('Wilhem').change();

  assert.equal(this.$('.outer-value').text().trim(), 'Ferdinand');
  assert.equal(this.$('.inner-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.has-changes').text().trim(), 'true');

  this.$('.apply-button').click();

  assert.equal(this.$('.outer-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.inner-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.has-changes').text().trim(), 'false');

  this.$('input').val('Albert').change();

  assert.equal(this.$('.outer-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.inner-value').text().trim(), 'Albert');
  assert.equal(this.$('.has-changes').text().trim(), 'true');

  this.$('.discard-button').click();

  assert.equal(this.$('.outer-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.inner-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.has-changes').text().trim(), 'false');
});

test('smoke test wrapped primitive value', function(assert) {
  assert.expect(15);

  this.set('model', 'Ferdinand');

  this.render(hbs`
    <span class="outer-value">{{model}}</span>

    {{#buffered-proxy content=model wrap=true as |content apply discard hasChanges|}}
      {{input value=content.value}}
      <span class="inner-value">{{content.value}}</span>
      <span class="has-changes">{{hasChanges}}</span>

      <button {{action apply}} class="apply-button">Apply</button>
      <button {{action discard}} class="discard-button">Discard</button>
    {{/buffered-proxy}}
  `);

  assert.equal(this.$('.outer-value').text().trim(), 'Ferdinand');
  assert.equal(this.$('.inner-value').text().trim(), 'Ferdinand');
  assert.equal(this.$('.has-changes').text().trim(), 'false');

  this.$('input').val('Wilhem').change();

  assert.equal(this.$('.outer-value').text().trim(), 'Ferdinand');
  assert.equal(this.$('.inner-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.has-changes').text().trim(), 'true');

  this.$('.apply-button').click();

  assert.equal(this.$('.outer-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.inner-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.has-changes').text().trim(), 'false');

  this.$('input').val('Albert').change();

  assert.equal(this.$('.outer-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.inner-value').text().trim(), 'Albert');
  assert.equal(this.$('.has-changes').text().trim(), 'true');

  this.$('.discard-button').click();

  assert.equal(this.$('.outer-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.inner-value').text().trim(), 'Wilhem');
  assert.equal(this.$('.has-changes').text().trim(), 'false');
});
