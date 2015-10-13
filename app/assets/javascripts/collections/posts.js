Discoverit.Collections.Posts = Backbone.BetterCollection.extend({
  url: "/api/posts",
  model: Discoverit.Models.Post,

  // comparator: function (post){
  //   return post.get("last_activity_stamp");
  // }
  parse: function (res){
    if(res._page){
      this._page = res._page;
      delete res._page;
    };
    if(res._total_pages){
      this._total_pages = res._total_pages;
      delete res._total_pages;
    };
    return res.posts || res;
  }
});
