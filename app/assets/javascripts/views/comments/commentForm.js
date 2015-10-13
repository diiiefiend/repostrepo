Discoverit.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST['comments/commentForm'],

  events: {
    "submit form" : "submitForm",
    "click .cancel-reply" : "unattachForm"
  },

  initialize: function (options){
    //model: comment
    //collection: comments
    this.isNew = this.model.isNew();
    this.parentCommentId = options.parentCommentId;
    this.listenTo(this.model, "sync", this.render);
  },

  submitForm: function (e){
    e.preventDefault();

    $(e.currentTarget).find("input[type='submit']").prop("disabled", true);

    var formData = $(e.currentTarget).serializeJSON().comment;
    formData["post_id"] = this.model.post().id;
    formData["parent_comment_id"] = this.parentCommentId;

    this.model.save( formData, {
      success: function (){
        this.collection.add(this.model);
        if(this.isNew){
          this.collection.trigger("newComment");
        } else {
          this.collection.trigger("changedComment");
        };
        if(!this.isNew || this.parentCommentId){
          this.unattachForm();
        } else{
          $(e.currentTarget).find("textarea").val("");
          this.model.clear();
          $(e.currentTarget).find("input[type='submit']").prop("disabled", false);
        };
      }.bind(this),
      error: function (){
        $(e.currentTarget).find("input[type='submit']").prop("disabled", false);
      }
    });
  },

  unattachForm: function (e){
    if(e){
      e.preventDefault();
    };
    this.remove();
    if(this.isNew){
      this.collection.trigger("cancelReply");
    } else {
      this.collection.trigger("cancelEdit");
    };
  },

  render: function (){
    var template = this.template({comment: this.model, parentCommentId: this.parentCommentId, creating: this.isNew});
    this.$el.html(template);
    return this;
  }
});
