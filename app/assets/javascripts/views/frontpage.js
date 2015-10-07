Discoverit.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST['frontpage'],

  initialize: function (){
    //collection: posts
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
  },

  render: function (){
    var template = this.template({posts: this.collection, user: Discoverit.currentUser.id});
    var sidebarView = new Discoverit.Views.SubsIndex({sidebar: true});
    this.$el.html(template);
    this.addSubview(".right_bar", sidebarView);
    return this;
  }

});
