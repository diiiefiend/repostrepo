Discoverit.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST['comments/commentShow'],

  events: {
    "submit .vote_container form" : "vote"
  },

  initialize: function (options){
    //model: comment
    this.displayPost = options.displayPost;
    this.post = options.post;

    // this.listenTo(this.model, "change", this.render);
  },

  vote: function (e){
    e.preventDefault();
    var vote = $(e.currentTarget).data('vote');
    var commentId = $(e.currentTarget).data('commentid');

    var model = this.model;

    var url = "api/posts/"+ model.post().id +"/comments/"+ model.id;
    (vote > 0) ? url += "/upvote" : url += "/downvote";

    if(this.model.id === commentId){
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        success: function (data){
          model.set(model.parse(data));
          Discoverit.currentUser.votes["Comment" + model.id] = vote;
          this.render({rerender: true});
        }.bind(this),
        error: function (data){
          options && options.error && options.error(model, data, options);
        }
      });
    };
  },

  render: function (options){
    var previousVote = Discoverit.currentUser.getVote("Comment" + this.model.id);
    var template = this.template({comment: this.model, displayPost: this.displayPost, post: this.post, previousVote: previousVote});

    if(options && options.rerender){
      $childComments = this.$el.find("[class^=commentLoop]").eq(0).html();
    };

    this.$el.html(template);

    if(options && options.rerender){
      this.$el.find("[class^=commentLoop]").html($childComments);
    };

    return this;
  }
});
