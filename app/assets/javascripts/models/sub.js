Discoverit.Models.Sub = Backbone.Model.extend({
  urlRoot: "/api/subs",

  toJSON: function (){
    return { sub: _.clone(this.attributes) };
  }
});
