const _ = require('lodash');
const Backbone = require('backbone');

const UserProfileView = Backbone.View.extend({
  el: '<div class="profile"></div>',

  template: _.template(`
    <div>
      <button>Back</button>
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
    'submit': 'handleFormSubmit'
  },

  handleCheckBoxClick(e) {
    this.model.save({ activated: e.target.checked});
  },

  handleEditClick(e) {
    var el = document.getElementsByClassName('hidable');
    el.style.display = (el.style.display != 'hidden' ? 'hidden' : '' );
  },


  handleFormSubmit(e) {
    const form = $(e.target);

    this.model.save({
      name: form.find('input[name="name"]').val(),
      email: form.find('input[name="email"]').val(),
      bio: form.find('input[name="bio"]').val(),
      img: form.find('input[name="img"]').val(),
    }, {
      success: () => {
        form.find('input[type="text"]').val('');
      }
    });
    e.preventDefault();
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
