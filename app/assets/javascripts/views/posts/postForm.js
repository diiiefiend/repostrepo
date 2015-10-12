Discoverit.Views.PostForm = Backbone.CompositeView.extend({
  template: JST['posts/postForm'],

  events: {
    "submit form" : "submitForm"
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
  },

  submitForm: function (e){
    e.preventDefault();
    this.$el.find("button").prop("disabled", true);
    var formData = $(e.currentTarget).serializeJSON().post;
    debugger
    this.model.save( formData, {
      success: function (){
        this.collection.add(this.model);
        Backbone.history.navigate("#posts/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function (){
        this.$el.find("button").prop("disabled", false);
      }
    });
  },

  render: function (){
    var template = this.template({post: this.model, creating: this.model.isNew(), subs: this.subs, subid: this.subid});
    this.$el.html(template);
    return this;
  }
});
