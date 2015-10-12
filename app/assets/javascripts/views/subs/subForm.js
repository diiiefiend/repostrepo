Discoverit.Views.SubForm = Backbone.CompositeView.extend({
  template: JST['subs/subForm'],

  events: {
    "submit form" : "submitForm",
    "click .delete-sub" : "deleteSub"
  },

  initialize: function (){
    //model: sub
    this.listenTo(this.model, "sync", this.render);
  },

  submitForm: function (e){
    e.preventDefault();
    this.$el.find("button").prop("disabled", true);
    var formData = $(e.currentTarget).serializeJSON().sub;
    this.model.save( formData, {
      success: function (){
        this.collection.add(this.model);
        Backbone.history.navigate("#subs/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function (){
        this.$el.find("button").prop("disabled", false);
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
