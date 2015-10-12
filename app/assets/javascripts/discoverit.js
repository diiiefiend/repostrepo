window.Discoverit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  initialize: function() {
    this.currentUser = new Discoverit.Models.CurrentUser();
    this.currentUser.fetch();

    this.userMenu = new Discoverit.Views.UserMenu({el: "#header p"});

    new Discoverit.Routers.Router({$el: $("#cont")});
    Backbone.history.start();
  }
};
