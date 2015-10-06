Discoverit.Collections.Subs = Backbone.BetterCollection.extend({
  url: "/api/subs",
  model: Discoverit.Models.Sub,

  comparator: function (sub){
    return sub.get("last_activity_stamp");
  }
});
