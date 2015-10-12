Discoverit.Views.SubShow = Backbone.CompositeView.extend({
  template: JST["subs/subShow"],

  initialize: function (){
    //model: sub
    //collection: posts in this sub
    this.collection = this.model.posts();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
  },

  render: function (){
    var template = this.template({sub: this.model});
    this.$el.html(template);

    this.collection.each( function (post){
      var postView = new Discoverit.Views.PostView({model: post, fp: false});
      this.addSubview(".posts", postView, false, {render: true});
    }.bind(this));

    return this;
  }
});
