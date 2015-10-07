Discoverit.Models.Comment = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/posts/'+ this.post.id +'/comments';
  },

  initialize: function (models, options){
    this.post = options.post
  },

  author: function (){
    if(!this._author){
      this._author = new Discoverit.Models.User();
    };
    return this._author;
  },

  toJSON: function (){
    return {comment: _.clone(this.attributes)};
  },

  parse: function (res){
    if(res.author){
      this.author().set(res.author);
      delete res.author;
    };
    return res;
  }
});
