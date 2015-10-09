Discoverit.Views.PostView = Backbone.CompositeView.extend({
  template: JST["posts/_post"],

  events: {
    "submit .vote_container form" : "vote"
  },

  initialize: function (options){
    //model: post
    this.fp = options.fp;
  },

  vote: function (e){
    e.preventDefault();
    var vote = $(e.currentTarget).data('vote');

    var model = this.model;

    var url = "api/posts/" + model.id;
    (vote > 0) ? url += "/upvote" : url += "/downvote";

    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      success: function (data){
        model.set(model.parse(data));
        Discoverit.currentUser.votes["Post" + model.id] = vote;
        this.render();
      }.bind(this),
      error: function (data){
        options && options.error && options.error(model, data, options);
      }
    });
  },

  render: function (){
    var previousVote = Discoverit.currentUser.getVote("Post" + this.model.id);
    var template = this.template({post: this.model, fp: this.fp, previousVote: previousVote});
    this.$el.html(template);
    return this;
  }

});
