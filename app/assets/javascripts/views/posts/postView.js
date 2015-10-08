Discoverit.Views.PostView = Backbone.CompositeView.extend({
  template: JST["posts/_post"],

  events: {
    "submit .upvote" : "upvote",
    "submit .downvote" : "downvote"
  },

  initialize: function (options){
    //model: post
    this.fp = options.fp;
  },

  render: function (){
    var template = this.template({post: this.model, fp: this.fp});
    this.$el.html(template);
    return this;
  }

});
