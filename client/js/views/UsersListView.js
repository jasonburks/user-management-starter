const Backbone = require('backbone');
const UserItemView = require('./UserItemView');
const UserFormView = require('./UserFormView');
const UserModel = require('../models/UserModel');


const UsersListView = Backbone.View.extend({
  el: `
    <div>
      <div id="form"></div>
      <ul class="user-list"></ul>
    </div
  `,

  initialize() {
    this.collection.fetch();
    this.listenTo(this.collection, 'update', this.render);
  },

  render() {
    this.$el.find('#form').html(
      new UserFormView({ collection: this.collection }).render().el
    );

    this.$el.html('');

    this.collection.each(user => {
      const view = new UserItemView({ model: user });
      this.$el.append(view.render().el);
    });

    return this;
  }
});

module.exports = UsersListView;
