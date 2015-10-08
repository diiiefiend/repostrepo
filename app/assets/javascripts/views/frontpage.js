Discoverit.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST['frontpage'],

  initialize: function (){
    //collection: posts
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
  },

  render: function (){
    var template = this.template();
    this.$el.html(template);

    var sidebarView = new Discoverit.Views.SubsIndex({sidebar: true});
    this.addSubview(".right_bar", sidebarView);

    this.collection.each( function (post){
      var postView = new Discoverit.Views.PostView({model: post, fp: true});
      this.addSubview(".posts", postView, false, {render: true});
    }.bind(this));

    return this;
  }

});
