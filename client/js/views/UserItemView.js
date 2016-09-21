const _ = require('lodash');
const Backbone = require('backbone');

const UserItemView = Backbone.View.extend({
  el: '<li class="user"></li>',

  template: _.template(`
    <a class="userLink" href="#users/<%= user.get('_id') %>">
      <img class="avatar" src="<%= user.get('image') %>" alt="Profile Pic" />
      <%= user.get('name') %>
    </a>
  `),

  render() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});

module.exports = UserItemView;
