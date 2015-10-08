Discoverit.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/userShow"],

  initialize: function (){
    //model: user
    this.listenTo(this.model, "sync", this.render);
  },

  render: function (){
    var template = this.template({user: this.model});
    this.$el.html(template);
    return this;
  }
});
