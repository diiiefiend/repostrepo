Discoverit.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "frontpage"
  },

  initialize: function (options){
    this.$el = options.$el;
    // this._posts = new Discoverit.Collections.Posts();
  },

  frontpage: function (){
    var view = new Discoverit.Views.FrontPage();
    this._swapView(view, {wait: false});
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
