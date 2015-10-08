Discoverit.Models.Sub = Backbone.Model.extend({
  urlRoot: "/api/subs",

  posts: function (){
    if(!this._posts){
      this._posts = new Discoverit.Collections.Posts();
    };
    return this._posts;
  },

  toJSON: function (){
    return { sub: _.clone(this.attributes) };
  },

  parse: function (res){
    if(res.posts){
      this.posts().set(res.posts, {parse: true});
      delete res.posts;
    };
    return res;
  }
});
