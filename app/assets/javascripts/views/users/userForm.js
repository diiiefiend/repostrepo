Discoverit.Views.UserForm = Backbone.CompositeView.extend({
  template: JST['users/userForm'],

  events: {
    "submit form" : "submitForm"
  },

  initialize: function (){
    //model: Discoverit.currentuser

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model, "signIn signOut", this.model.goHome);
  },

  submitForm: function (e){
    e.preventDefault();
    this.$el.find("input[type='submit']").prop("disabled", true);
    var formData = $(e.currentTarget).serializeJSON().user;
    if(formData["old_pword"] === ""){
      delete formData["old_pword"];
      delete formData["new_pword"];
    };
    this.model.save( formData, {
      success: function (){
        // alert("Successfully updated!");
        this.$el.find("input[type='submit']").prop("disabled", false);
        Backbone.history.navigate("#users/"+Discoverit.currentUser.id);
      }.bind(this),
      error: function (){
        this.$el.find("input[type='submit']").prop("disabled", false);
      }.bind(this)
    });
  },

  render: function (){
    var template = this.template({user: this.model});
    this.$el.html(template);
    return this;
  }
});
