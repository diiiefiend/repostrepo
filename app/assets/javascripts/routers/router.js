Discoverit.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "frontpage",

    "posts/new" : "createPost",
    "posts/:id" : "showPost",

    "subs/new" : "createSub",
    "subs/:id" : "showSub",

    "users/:id" : "showUser"
  },

  initialize: function (options){
    this.$el = options.$el;
    this._posts = new Discoverit.Collections.Posts();
    this._subs = new Discoverit.Collections.Subs();
    this._users = new Discoverit.Collections.Users();
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

  createSub: function (){
    var callback = this.createSub.bind(this);
    if (!this._requireSignedIn(callback)) { return; } //if not signed in, return

    var sub = new Discoverit.Models.Sub();
    var view = new Discoverit.Views.SubForm({model: sub, collection: this._subs});
    this._swapView(view, {wait: false});
  },

  showUser: function (id){
    var user = this._users.getOrFetch(id);
    var view = new Discoverit.Views.UserShow({model: user});
    this._swapView(view);
  },

  // "private" methods

  _requireSignedIn: function(callback, wait){
    if (!Discoverit.currentUser.isSignedIn()) {
      debugger
      callback = callback || this._goHome.bind(this);
      Discoverit.userMenu.showLogin(null, callback);
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
