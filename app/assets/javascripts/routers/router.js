Discoverit.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "frontpage",

    "users/new" : "newUser",
    "session/new" : "signIn"
  },

  initialize: function (options){
    this.$el = options.$el;
    // this._posts = new Discoverit.Collection.Posts();
  },

  frontpage: function (){
    var view = new Discoverit.Views.FrontPage();
    this._swapView(view, {wait: false});
  },

  newUser: function (){
    if(!this._requireSignedOut()) {return;}         //if not signed out, return
    // var model = new this._users.model();
    var view = new Discoverit.Views.UserForm({
      // collection: this._users,
      // model: model
    });
    this._swapView(view, {wait: false});
  },

  signIn: function (callback){
    if (!this._requireSignedOut(callback)) { return; }    //if not signed out, return

    var view = new Discoverit.Views.SignIn({callback: callback});
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
