Discoverit.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST['comments/commentShow'],

  events: {
    "submit form" : "vote"
  },

  initialize: function (options){
    //model: comment
    this.displayPost = options.displayPost;
    this.post = options.post;
  },

  vote: function (e){
    e.preventDefault();
    var vote = $(e.currentTarget).data('vote');
    if(vote > 0){

    } else {

    };
  },

  render: function (){
    var template = this.template({comment: this.model, displayPost: this.displayPost, post: this.post});
    this.$el.html(template);
    return this;
  }
});
