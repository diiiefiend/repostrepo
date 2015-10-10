Discoverit.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/postShow'],

  initialize: function (){
    //model: post
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
  },


  displayPost: function (){
    var postView = new Discoverit.Views.PostView({model: this.model, fp: false});
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

  render: function (){
    var template = this.template({post: this.model});
    this.$el.html(template);

    this.displayPost();
    this.addCommentsToView();
    return this;
  }
});
