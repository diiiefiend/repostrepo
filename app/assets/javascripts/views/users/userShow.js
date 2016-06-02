Discoverit.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/userShow"],

  initialize: function (){
    //model: user
    this.listenTo(this.model, "sync", this.render);
  },

  render: function (){
    var template = this.template({user: this.model});
    this.$el.html(template);

    this.model.lastPosts().each( function (post){
      var postView = new Discoverit.Views.PostView({model: post, fp: false});
      this.addSubview(".posts", postView, false, {render: true});
    }.bind(this));

    this.model.lastComments().each( function (comment){
      var commentShow = new Discoverit.Views.CommentShow({model: comment, post: comment.post, displayPost: true});
      this.addSubview(".comments", commentShow, false, {render: true});
    }.bind(this));

    $(document).trigger("pageLoaded");

    return this;
  }
});
