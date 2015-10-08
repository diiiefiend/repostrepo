Discoverit.Collections.Posts = Backbone.BetterCollection.extend({
  url: "/api/posts",
  model: Discoverit.Models.Post

  // comparator: function (post){
  //   return post.get("last_activity_stamp");
  // }
});
