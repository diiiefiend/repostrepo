Discoverit.Models.Comment = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/posts/'+ this._post.id +'/comments';
  },

  initialize: function (models, options){
    if(!this._post){        //sometimes will be set by parse
      this._post = options.post
    };
  },

  author: function (){
    if(!this._author){
      this._author = new Discoverit.Models.User();
    };
    return this._author;
  },

  post: function (){
    if(!this._post){
      this._post = new Discoverit.Models.Post();
    };
    return this._post;
  },

  toJSON: function (){
    return {comment: _.clone(this.attributes)};
  },

  parse: function (res){
    if(res.author){
      this.author().set(res.author);
      delete res.author;
    };
    if(res.post){
      this.post().set(this.post().parse(res.post));
      delete res.post;
    };
    return res;
  }
});
