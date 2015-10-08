Discoverit.Views.SubShow = Backbone.CompositeView.extend({
  template: JST["subs/subShow"],

  initialize: function (){
    //model: sub
    //collection: posts in this sub
    this.collection = this.model.posts();
    this.listenTo(this.model, "sync", this.render);
  },

  render: function (){
    var template = this.template({sub: this.model, posts: this.collection});
    this.$el.html(template);
    return this;
  }
});
