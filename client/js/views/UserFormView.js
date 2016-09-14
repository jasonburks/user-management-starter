const _ = require('lodash');
const Backbone = require('backbone');
const UserModel = require('../models/UserModel');


const UserFormView = Backbone.View.extend({
  el: `
    <form>
      <div>
        <label for="name">Name:</label>
        <input type="text" name="name" />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="text" name="email" />
      </div>

      <div>
        <label for="bio">Bio:</label>
        <input type="text" name="bio" />
      </div>

      <div>
        <label for="image">Image:</label>
        <input type="text" name="image" />
      </div>

      <input type="hidden" name="activated" value="true">
      <input type="submit" value="+ Add user" />
    </form>
  `,

  events: {
     'submit': 'handleFormSubmit'
   },

   handleFormSubmit(e) {
     const form = $(e.target);
     const userAttrs = {
       name: form.find('input[name="name"]').val(),
       email: form.find('input[name="email"]').val(),
       bio: form.find('input[name="bio"]').val(),
       image: form.find('input[name="image"]').val(),
       activated: form.find('input[name="activated"]').val()
     };

     user = new UserModel(userAttrs);

     user.save(null, {
       success: () => {
         // Add the new User
         this.collection.add(user);

         // Empty the form inputs
         form.find('input[type="text"]').val('');
       },

       error: () => {
         // Handle Error
       }

     });

     // Prevent the forms default action
     e.preventDefault();
  },

  render() {
    return this;
  }

});

module.exports = UserFormView;
