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
    if(this.model.id === commentId){
      if(vote > 0){
        $.ajax({
          url: "api/posts/"+ model.post().id +"/comments/"+ model.id +"/upvote",
          type: "POST",
          dataType: "json",
          success: function (data){
            model.set(model.parse(data));
            this.render({rerender: true});
          }.bind(this),
          error: function (data){
            options && options.error && options.error(model, data, options);
          }
        });
      } else {
        $.ajax({
          url: "api/posts/"+ model.post().id +"/comments/"+ model.id +"/downvote",
          type: "POST",
          dataType: "json",
          success: function (data){
            model.set(model.parse(data));
            this.render({rerender: true});
          }.bind(this),
          error: function (data){
            options && options.error && options.error(model, data, options);
          }
        });
      };
    };
  },

  render: function (options){
    var template = this.template({comment: this.model, displayPost: this.displayPost, post: this.post});

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
