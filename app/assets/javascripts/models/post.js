Discoverit.Models.Post = Backbone.Model.extend({
  urlRoot: "/api/posts",

  author: function (){
    if(!this._author){
      this._author = new Discoverit.Models.User();
    };
    return this._author;
  },

  subs: function (){
    if(!this._subs){
      this._subs = new Discoverit.Collections.Subs();
    };
    return this._subs;
  },

  comments: function (){
    if(!this._comments){
      this._comments = new Discoverit.Collections.Comments([], {post: this});
    };
    return this._comments;
  },

  commentHash: function (){
    if(!this._commentHash){
      this._commentHash = [];
    };
    return this._commentHash;
  },

  toJSON: function (){
    return { post: _.clone(this.attributes) };
  },

  parse: function (res){
    if(res.author){
      this.author().set(res.author);
      delete res.author;
    };
    if(res.subs){
      this.subs().set(res.subs);
      delete res.subs;
    }
    if(res.comments){
      this.comments().set(res.comments, {parse: true});
      delete res.comments;
    };
    if(res.comment_hash){
      this._commentHash = res.comment_hash;
      delete res.comment_hash;
    }
    return res;
  }
});
