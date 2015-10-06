Discoverit.Views.UserForm = Backbone.CompositeView.extend({
  template: JST['shared/userForm'],

  render: function (){
    var template = this.template();
    this.$el.html(template);
    return this;
  }
});
