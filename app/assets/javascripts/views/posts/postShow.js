Discoverit.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/postShow'],

  initialize: function (){
    //model: post
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
    this.listenTo(this.model.comments(), "newComment", this.rerenderComments);
  },


  displayPost: function (){
    var postView = new Discoverit.Views.PostView({model: this.model, fp: true});
    this.addSubview("ul.post", postView, false, {render: true});
  },

  addCommentsToView: function (){
    var topLevelComments = this.model.comments().where({parent_comment_id: null});
    topLevelComments.forEach( function(comment){
      var commentShow = new Discoverit.Views.CommentShow({model: comment, displayPost: false, post: this.model});
      this.addSubview("#comment-area", commentShow, false, {render: true});
      if(this.model.commentHash()[comment.id]){
        var commentLoop = new Discoverit.Views.CommentLoop({post: this.model, curId: comment.id});
        this.addSubview(".commentLoop-"+comment.id, commentLoop, false, {render: true});
      };
    }.bind(this));
  },

  rerenderComments: function (){
    var lastComment = this.model.comments().at(this.model.comments().length-1);
    var commentShow = new Discoverit.Views.CommentShow({model: lastComment, displayPost: false, post: this.model});
    var parentCommentId = lastComment.get("parent_comment_id");
    this.addSubview(".commentLoop-"+parentCommentId, commentShow, true, {render: true});
  },

  render: function (){
    var template = this.template({post: this.model});
    this.$el.html(template);

    this.displayPost();
    if(Discoverit.currentUser.isSignedIn()){
      var newComment = new Discoverit.Models.Comment([], {post: this.model});
      var commentForm = new Discoverit.Views.CommentForm({model: newComment, collection: this.model.comments(), parentCommentId: null});
      this.addSubview("h3", commentForm, false, {render: true});
    };
    this.addCommentsToView();
    return this;
  }
});
