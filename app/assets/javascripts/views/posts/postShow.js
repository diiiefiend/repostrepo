Discoverit.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/postShow'],

  initialize: function (){
    //model: post
    this.listenTo(this.model, "sync", this.render);
  },

  render: function (){
    var topLevelComments = this.model.comments().where({parent_comment_id: null});
    var template = this.template({post: this.model, topLevelComments: topLevelComments});
    this.$el.html(template);
    return this;
  }
});
