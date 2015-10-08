Discoverit.Views.CommentLoop = Backbone.CompositeView.extend({
  template: JST["comments/_commentsLoop"],

  initialize: function (options){
    this.curId = options.curId;
    this.post = options.post;
  },

  render: function (){
    var template = this.template({post: this.post, curId: this.curId});
    this.$el.html(template);

    this.post.commentHash()[this.curId].forEach ( function (childComment){
      var c2 = this.post.comments().where({id: childComment.id})[0];
      var commentShow = new Discoverit.Views.CommentShow({model: c2, displayPost: false, post: this.post});
      this.addSubview(".comments-"+this.curId, commentShow, false, {render: true});
      if(this.post.commentHash()[childComment.id]){
        this.$el.find(".comments-"+this.curId).append("<div class=commentLoop-"+childComment.id);
        var commentLoop = new Discoverit.Views.CommentLoop({post: this.post, curId: childComment.id});
        this.addSubview(".commentLoop-"+childComment.id, commentLoop, false, {render: true});
      };
    }.bind(this));

    return this;
  }
});
