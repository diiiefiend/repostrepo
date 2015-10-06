Discoverit.Models.Comment = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/posts/'+ this.post.id +'/comments';
  },

  initialize: function (models, options){
    this.post = options.post
  },

  toJSON: function (){
    return {comment: _.clone(this.attributes)};
  }
});
