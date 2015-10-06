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
    return this._subs.sort();
  },

  comments: function (){
    if(!this._comments){
      this._comments = new Discoverit.Collections.Comments([], {post: this});
    };
    return this._comments.sort();
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
      this.comments().set(res.comments);
      delete res.comments;
    };
    return res;
  }
});
