Discoverit.Models.Sub = Backbone.Model.extend({
  urlRoot: "/api/subs",

  posts: function (){
    if(!this._posts){
      this._posts = new Discoverit.Collections.Posts();
    };
    return this._posts;
  },

  mod: function (){
    if(!this._mod){
      this._mod = new Discoverit.Models.User();
    };
    return this._mod;
  },

  toJSON: function (){
    return { sub: _.clone(this.attributes) };
  },

  parse: function (res){
    if(res.posts){
      this.posts().set(res.posts, {parse: true});
      delete res.posts;
    };
    if(res.mod){
      this.mod().set(res.mod);
      delete res.mod;
    }
    return res;
  }
});
