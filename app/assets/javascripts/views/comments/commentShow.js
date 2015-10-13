Discoverit.Views.CommentShow = Backbone.CompositeView.extend(
  _.extend({}, Discoverit.Mixins.Votable, {
    template: JST['comments/commentShow'],

    events: {
      "submit .vote_container form" : "vote",
      "click .reply-comment-link" : "replyToComment",
      "click .edit-comment-link" : "editComment",
      "click .delete-comment-link" : "deleteComment"
    },

    initialize: function (options){
      //model: comment
      //collection: comments (set below)
      this.displayPost = options.displayPost;
      this.post = options.post;
      this.collection = this.post.comments();
      this.modelType = "Comment";

      this.listenTo(this.model, "changedComment", this.rerender);
      this.listenTo(this.collection, "cancelReply", this.reenableReply);
      this.listenTo(this.collection, "cancelEdit", this.displayComment);
      this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
    },

    rerender: function (){
      debugger
      this.render({rerender: true});
    },

    replyToComment: function (e){
      e.preventDefault();
      if($(e.currentTarget).parent().data("commentid") === this.model.id){
        var newComment = new Discoverit.Models.Comment([], {post: this.post});
        var commentForm = new Discoverit.Views.CommentForm({model: newComment, collection: this.post.comments(), parentCommentId: this.model.id});
        this.addSubview(".comment-reply-area-" + this.model.id, commentForm, false, {render: true});
        $(e.currentTarget).removeClass("reply-comment-link");
      };
    },

    reenableReply: function (){
      this.$el.find("a:contains('reply')").addClass("reply-comment-link");
    },

    editComment: function (e){
      e.preventDefault();
      if($(e.currentTarget).parent().data("commentid") === this.model.id){
        var comment = this.post.comments().getOrFetch(this.model.id);
        var commentForm = new Discoverit.Views.CommentForm({model: comment, collection: this.post.comments(), parentCommentId: this.model.get("parent_comment_id")});
        this.$el.find(".comment-body-"+this.model.id).empty();
        this.addSubview(".comment-body-"+this.model.id, commentForm, false, {render: true});
      };
    },

    displayComment: function (){
      this.$el.find(".comment-body-"+this.model.id).html("<p>"+this.model.escape("content")+"</p>");
    },

    deleteComment: function (e){
      e.preventDefault();
      if($(e.currentTarget).parent().data("commentid") === this.model.id){
        this.model.destroy({
          success: function (model, res){
            this.model.set(res, {parse: true});
            this.collection.trigger("changedComment");
          }.bind(this)
        });
      };
    },

    render: function (options){
      if(Discoverit.currentUser.isSignedIn()){
        this.previousVote = Discoverit.currentUser.getVote("Comment" + this.model.id);
      };

      var template = this.template({comment: this.model, displayPost: this.displayPost, post: this.post, previousVote: this.previousVote});

      if(options && options.rerender){
        $childComments = this.$el.find("[class^=commentLoop]").eq(0).html();
      };

      this.$el.html(template);

      if(options && options.rerender){
        this.$el.find("[class^=commentLoop]").html($childComments);
      };

      return this;
    }
  })
);
