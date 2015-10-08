Discoverit.Collections.Comments = Backbone.BetterCollection.extend({
  model: Discoverit.Models.Comment,

  url: function(){
    return 'api/posts/'+ this.post.id +'/comments'
  },

  // comparator: function (comment){
  //   return comment.get('created_at');
  // },

  initialize: function (models, options){
    this.post = options.post;
  }
});
