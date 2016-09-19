const _ = require('lodash');
const Backbone = require('backbone');

const UserItemView = Backbone.View.extend({
  el: '<li class="user"></li>',

  template: _.template(`
    <a href="#users/<%= user.get('_id') %>">
      <img src="<%= user.get('image') %>" alt="Profile Pic" className="avatar" />
    </a>
      <div>
        <span> <%= user.get('name') %> </span>
      </div>
  `),

  render() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});

module.exports = UserItemView;
