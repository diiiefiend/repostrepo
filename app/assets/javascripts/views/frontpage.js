Discoverit.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST['frontpage'],

  initialize: function (){
    //collection: posts
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (){
    var template = this.template({posts: this.collection, user: Discoverit.currentUser.id});
    this.$el.html(template);
    return this;
  }

});
