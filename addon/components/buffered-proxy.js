import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import layout from '../templates/components/buffered-proxy';
const { Component } = Ember;

export default Component.extend({
  layout,
  tagName: '',
  bufferedProxy: null,
  wrap: false,

  didInitAttrs({ attrs }) {
    const value = attrs.content.value;
    const content = this.get('wrap') ? { value } : value;

    this.set('bufferedProxy', BufferedProxy.create({
      content
    }));
  },

  actions: {
    applyChanges() {
      this.get('bufferedProxy').applyChanges();
      this.updateWrappedValue();
    },

    discardChanges() {
      this.get('bufferedProxy').discardChanges();
      this.updateWrappedValue();
    }
  },

  updateWrappedValue() {
    if (this.get('wrap')) {
      this.set('content', this.get('bufferedProxy.value'));
    }
  }
});
