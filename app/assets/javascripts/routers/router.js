Discoverit.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "frontpage",

    "posts/:id" : "showPost",

    "subs/:id" : "showSub",

    "users/:id" : "showUser"
  },

  initialize: function (options){
    this.$el = options.$el;
    this._posts = new Discoverit.Collections.Posts();
    this._subs = new Discoverit.Collections.Subs();
  },

  frontpage: function (){
    this._posts.fetch();
    var view = new Discoverit.Views.FrontPage({collection: this._posts});
    this._swapView(view);
  },

  showPost: function (id){
    var post = this._posts.getOrFetch(id);
    var view = new Discoverit.Views.PostShow({model: post});
    this._swapView(view);
  },

  showSub: function (id){
    var sub = this._subs.getOrFetch(id);
    var view = new Discoverit.Views.SubShow({model: sub});
    this._swapView(view);
  },

  // "private" methods

  _requireSignedIn: function(callback, wait){
    if (!Discoverit.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback, wait);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (Discoverit.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view, options){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    if(options && options.wait === false){
      this.$el.html(view.render().$el);
    } else {
      this.$el.html(view.$el);              //don't render right away
    };
  }

});
