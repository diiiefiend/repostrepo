Discoverit.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST['frontpage'],

  render: function (){
    var template = this.template();
    this.$el.html(template);
    return this;
  }

});
