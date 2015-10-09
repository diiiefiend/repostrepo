Discoverit.Views.PostView = Backbone.CompositeView.extend({
  template: JST["posts/_post"],

  events: {
    "submit .vote_container form" : "vote"
  },

  initialize: function (options){
    //model: post
    this.fp = options.fp;
  },

  vote: function (e){
    e.preventDefault();
    var vote = $(e.currentTarget).data('vote');

    var model = this.model;
    if(vote > 0){
      $.ajax({
        url: "api/posts/"+ model.id +"/upvote",
        type: "POST",
        dataType: "json",
        success: function (data){
          model.set(model.parse(data));
          this.render();
        }.bind(this),
        error: function (data){
          options && options.error && options.error(model, data, options);
        }
      });
    } else {
      $.ajax({
        url: "api/posts/"+ model.id +"/downvote",
        type: "POST",
        dataType: "json",
        success: function (data){
          model.set(model.parse(data));
          this.render();
        }.bind(this),
        error: function (data){
          options && options.error && options.error(model, data, options);
        }
      });
    };
  },

  render: function (){
    var template = this.template({post: this.model, fp: this.fp});
    this.$el.html(template);
    return this;
  }

});
