Discoverit.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  username: function (){
    return this.escape('username');
  },

  lastPosts: function (){
    if(!this._lastPosts){
      this._lastPosts = new Discoverit.Collections.Posts();
    };
    return this._lastPosts;
  },

  lastComments: function (){
    if(!this._lastComments){
      //set it up with a generic post object
      this._lastComments = new Discoverit.Collections.Comments([], {post: new Discoverit.Models.Post()});
    };
    return this._lastComments;
  },

  toJSON: function (){
    return { user: _.clone(this.attributes) };
  },

  parse: function (res){
    if(res.last_posts){
      this.lastPosts().set(res.last_posts, {parse: true});
      delete res.last_posts;
    };
    if(res.last_comments){
      this.lastComments().set(res.last_comments, {parse: true});
      delete res.last_comments;
    };
    return res;
  }
});


Discoverit.Models.CurrentUser = Discoverit.Models.User.extend({
  url: "/api/session",

  initialize: function (){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function (){
    return !this.isNew();
  },

  signIn: function (options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };
    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function (options){
    var model = this;
    $.ajax({
      url: this.url,
      type: "delete",
      dataType: "json",
      success: function (data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function (){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.synced = false;
      this.trigger("signOut");
    }
  }

});
