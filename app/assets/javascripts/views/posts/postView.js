Discoverit.Views.PostView = Backbone.CompositeView.extend(
  _.extend({}, Discoverit.Mixins.Votable, {
    template: JST["posts/_post"],

    events: {
      "submit .vote_container form" : "vote"
    },

    initialize: function (options){
      //model: post
      this.modelType = "Post";
      this.fp = options.fp;
    },

    render: function (){
      if(Discoverit.currentUser.isSignedIn()){
        this.previousVote = Discoverit.currentUser.getVote("Post" + this.model.id);
      };
      var template = this.template({post: this.model, fp: this.fp, previousVote: this.previousVote});
      this.$el.html(template);
      return this;
    }
  })
);
