Discoverit.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST['frontpage'],

  events: {
    "click .next-page" : "nextPage",
    "click .prev-page" : "prevPage"
  },

  initialize: function (){
    //collection: posts
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(Discoverit.currentUser, "signIn signOut", this.render);
  },

  nextPage: function (e){
    this.collection.fetch({
      data: {
        page: (this.collection._page || 1) + 1
      }
    });

    window.scrollTo(0,0);
  },

  prevPage: function (e){
    e.preventDefault();
    this.collection.fetch({
      data: {
        page: Math.max(this.collection._page - 1, 1)
      }
    });
    
    window.scrollTo(0,0);
  },

  render: function (){
    var template = this.template({hasNextPage: this.collection._page < this.collection._total_pages, hasPrevPage: this.collection._page > 1});
    this.$el.html(template);

    var sidebarView = new Discoverit.Views.SubsIndex({sidebar: true});
    this.addSubview(".right_bar", sidebarView);

    this.collection.each( function (post){
      var postView = new Discoverit.Views.PostView({model: post, fp: true});
      this.addSubview(".posts", postView, false, {render: true});
    }.bind(this));

    $(document).trigger("pageLoaded");

    return this;
  }

});
