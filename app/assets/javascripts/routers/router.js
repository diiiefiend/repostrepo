Discoverit.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "frontpage",

    "#users/new" : "newUser",
    "#session/new" : "signIn"
  },

  initialize: function (options){
    this.$el = options.$el;
  },

  frontpage: function (){

  },

  newUser: function (){

  },

  signIn: function (){

  }

});
