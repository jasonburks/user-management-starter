const _ = require('lodash');
const Backbone = require('backbone');

const UserProfileView = Backbone.View.extend({
  el: '<div class="profile"></div>',

  template: _.template(`
    <img src="<%= user.get('image') %>" alt="Profile Pic" />
    <div>
      <label>Name:</label>
      <span> <%= user.get('name') %> </span>
    </div>
    <div>
      <label>Email:</label>
      <span> <%= user.get('email') %> </span>
    </div>
    <div>
      <label>Bio:</label>
      <p> <%= user.get('bio') %> </p>
    </div>
  `),

  initialize() {
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },

  render() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});

module.exports = UserProfileView;
