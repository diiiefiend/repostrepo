Discoverit.Views.SubForm = Backbone.CompositeView.extend({
  template: JST['subs/subForm'],

  events: {
    "submit form" : "submitForm",
    "click .delete-sub" : "deleteSub"
  },

  initialize: function (){
    //model: sub
    //collection: subs
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", Discoverit.currentUser.goHome);
  },

  submitForm: function (e){
    e.preventDefault();
    this.$el.find("input[type='submit']").prop("disabled", true);
    var formData = $(e.currentTarget).serializeJSON().sub;
    this.model.save( formData, {
      success: function (){
        this.collection.add(this.model);
        Backbone.history.navigate("#subs/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function (){
        this.$el.find("input[type='submit']").prop("disabled", false);
      }.bind(this)
    });
  },

  deleteSub: function (e){
    e.preventDefault();
    this.model.destroy({
      success: function (){
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  render: function (){
    var template = this.template({sub: this.model, creating: this.model.isNew()});
    this.$el.html(template);
    return this;
  }
});
