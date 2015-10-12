Discoverit.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST['comments/commentForm'],

  events: {
    "submit form" : "submitForm"
  },

  initialize: function (options){
    //model: comment
    //collection: comments
    this.parentCommentId = options.parentCommentId;
    this.listenTo(this.model, "sync", this.render);
  },

  submitForm: function (e){
    e.preventDefault();

    $(e.currentTarget).find("button").prop("disabled", true);

    var formData = $(e.currentTarget).serializeJSON().comment;
    formData["post_id"] = this.model.post().id;
    formData["parent_comment_id"] = this.parentCommentId;

    this.model.save( formData, {
      success: function (){
        this.collection.add(this.model);
        this.collection.trigger("newComment");
        $(e.currentTarget).find("textarea").val("");
        this.model.clear();
        $(e.currentTarget).find("button").prop("disabled", false);
      }.bind(this),
      error: function (){
        $(e.currentTarget).find("button").prop("disabled", false);
      }
    });
  },

  render: function (){
    var template = this.template({comment: this.model, parentCommentId: this.parentCommentId});
    this.$el.html(template);
    return this;
  }
});
