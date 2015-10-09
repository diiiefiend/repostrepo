Discoverit.Views.UserMenu = Backbone.View.extend({
  template: JST['shared/userMenu'],

  events: {
    "click #logout-link": "signOut",
    "click .login-link" : "showLogin",
    "click .signup-link" : "showSignup",
    "click .close" : "hideModal",
    "submit #login form": "logIn",
    "submit #signup form": "newUser"
  },

  initialize: function (options){
    this.collection = new Discoverit.Collections.Users();

    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
    this.render();
  },

  showLogin: function (e){
    e.preventDefault;
    $("#login").removeClass("hidden").addClass("modal");
  },

  showSignup: function (e){
    e.preventDefault;
    $("#signup").removeClass("hidden").addClass("modal");
  },

  hideModal: function (e){
    e.preventDefault;
    $("#login").removeClass("modal").addClass("hidden");
    $("#signup").removeClass("modal").addClass("hidden");
  },

  render: function (){
    var template = this.template({currentUser: Discoverit.currentUser});
    this.$el.html(template);
    return this;
  },

  signOut: function (e){
    Discoverit.currentUser.signOut({
      success: function (){
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  logIn: function (e){
    e.preventDefault();

    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;
    Discoverit.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  newUser: function (e){
    e.preventDefault();

    var newUser = new Discoverit.Models.User();

    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;

    newUser.save( formData, {
      success: function (){
        Discoverit.currentUser.fetch();
        this.collection.add(newUser, {merge: true});
      }.bind(this),
      error: function(){
        alert("Could not create user. Please try again.");
      }
    });
  }

});
