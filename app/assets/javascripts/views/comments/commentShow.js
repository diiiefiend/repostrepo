Discoverit.Views.CommentShow = Backbone.CompositeView.extend(
  _.extend({}, Discoverit.Mixins.Votable, {
    template: JST['comments/commentShow'],

    events: {
      "submit .vote_container form" : "vote"
    },

    initialize: function (options){
      //model: comment
      this.displayPost = options.displayPost;
      this.post = options.post;
      this.modelType = "Comment";

      // this.listenTo(this.model, "change", this.render);
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
