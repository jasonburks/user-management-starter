const _ = require('lodash');
const Backbone = require('backbone');

const UserProfileView = Backbone.View.extend({
  el: '<div class="profile"></div>',

  template: _.template(`
    <div>
      <button id="back-button">Back</button>
    </div>
      <img class="avatar-large hidable" src="<%= user.get('image') %>" alt="Profile Pic" />
      <label class="hidable hidden">Image:</label>
      <input class="hidable hidden" value="<%= user.get('image')%>" type="text" name="image" placeholder="image link" />\
    <div>
      <label>Name:</label>
      <span class="hidable"> <%= user.get('name') %> </span>
      <input class="hidable hidden" value="<%= user.get('name')%>" type="text" name="name" placeholder="name" />

    </div>
    <div>
      <label>Email:</label>
      <span class="hidable"> <%= user.get('email') %> </span>
      <input class="hidable hidden" value="<%= user.get('email')%>" type="text" name="email" placeholder="email" />
    </div>
    <div>
      <label>Bio:</label>
      <span class="hidable"> <%= user.get('bio') %> </span>
      <input class="hidable hidden" value="<%= user.get('bio')%>" type="text" class="form-control" name="bio" placeholder="bio" />
    </div>
    <button name="edit">Edit</button>
    <button type="submit">Save</button>
    <div>
      <label>Activated:</label>
      <input type="checkbox" <%= user.get('activated') ? 'checked' : '' %> />
    </div>
  `),

  events: {
    'click input[type="checkbox"]' : 'handleCheckBoxClick',
    'click button[name="edit"]' : 'handleEditClick',
    'click button[id="back-button"]' : 'handleBackButtonClick',
    'click button[type="submit"]' : 'handleFormSubmit',
  },

  handleBackButtonClick(e) {
    Backbone.history.history.back();
  },

  handleCheckBoxClick(e) {
    this.model.save({ activated: e.target.checked});
  },

  handleEditClick(e) {
    this.$el.find('.hidable').toggleClass('hidden');
  },


  handleFormSubmit(e) {
    e.preventDefault();
    this.model.save({
      name: this.$('input[name="name"]').val(),
      email: this.$('input[name="email"]').val(),
      bio: this.$('input[name="bio"]').val(),
      img: this.$('input[name="img"]').val(),
    }, {
      success: () => {
        this.$('input[type="text"]').val('');
      }
    });
  },

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
