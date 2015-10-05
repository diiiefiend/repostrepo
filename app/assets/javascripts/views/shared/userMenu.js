Discoverit.Views.UserMenu = Backbone.View.extend({
  template: JST['shared/userMenu'],

  events: {
    "click #logout-link": "signOut"
  },

  initialize: function (options){
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
    this.render();
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
  }

});
