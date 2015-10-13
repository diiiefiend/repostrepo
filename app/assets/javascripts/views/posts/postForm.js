Discoverit.Views.PostForm = Backbone.CompositeView.extend({
  template: JST['posts/postForm'],

  events: {
    "submit form" : "submitForm",
    "click .delete-post" : "deletePost"
  },

  initialize: function (options){
    //model: post
    //collection: posts
    this.subs = options.subs;
    if(options.subid && options.subid !== "fp"){
      this.subid = parseInt(options.subid);
    };
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.subs, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", Discoverit.currentUser.goHome);
  },

  submitForm: function (e){
    e.preventDefault();
    this.$el.find("input[type='submit']").prop("disabled", true);
    var formData = $(e.currentTarget).serializeJSON().post;
    this.model.save( formData, {
      success: function (){
        this.collection.add(this.model);
        Backbone.history.navigate("#posts/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function (){
        this.$el.find("input[type='submit']").prop("disabled", false);
      }
    });
  },

  deletePost: function (e){
    e.preventDefault();
    this.model.destroy({
      success: function (){
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  render: function (){
    var template = this.template({post: this.model, creating: this.model.isNew(), subs: this.subs, subid: this.subid});
    this.$el.html(template);
    return this;
  }
});
