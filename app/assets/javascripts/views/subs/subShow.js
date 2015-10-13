Discoverit.Views.SubShow = Backbone.CompositeView.extend({
  template: JST["subs/subShow"],

  events: {
    "click .next-page" : "nextPage",
    "click .prev-page" : "prevPage"
  },

  initialize: function (){
    //model: sub
    //collection: posts in this sub
    this.collection = this.model.posts();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
  },

  nextPage: function (e){
    e.preventDefault();
    this.model.fetch({
      data: {
        page: (this.model._page || 1) + 1
      }
    });
  },

  prevPage: function (e){
    e.preventDefault();
    this.model.fetch({
      data: {
        page: Math.max(this.model._page - 1, 1)
      }
    });
  },

  render: function (){
    var template = this.template({sub: this.model, hasNextPage: this.model._page < this.model._total_pages, hasPrevPage: this.model._page > 1});
    this.$el.html(template);

    this.collection.each( function (post){
      var postView = new Discoverit.Views.PostView({model: post, fp: false});
      this.addSubview(".posts", postView, false, {render: true});
    }.bind(this));

    return this;
  }
});
