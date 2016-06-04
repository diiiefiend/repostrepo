Discoverit.Mixins.Votable = {
  vote: function (e){
    e.preventDefault();

    if(Discoverit.currentUser.isSignedIn()){
      var vote = $(e.currentTarget).data('vote');

      if(this.modelType === "Comment"){
        var commentId = $(e.currentTarget).data('commentid');
      };

      var model = this.model;
      if(this.modelType === "Post"){
        var url = "api/posts/" + model.id;
      } else {
        var url = "api/posts/"+ model.post().id +"/comments/"+ model.id;
      };

      if($(e.currentTarget).find("button").hasClass("bolded")){
        url += "/clear_vote";

        $.ajax({
          url: url,
          type: "POST",
          dataType: "json",
          success: function (data){
            model.set(model.parse(data));
            delete Discoverit.currentUser.votes[this.modelType + model.id];
            this.render({rerender: true});
            
            $(document).trigger("pageLoaded");
          }.bind(this),
          error: function (data){
            options && options.error && options.error(model, data, options);
          }
        });
      } else {
        (vote > 0) ? url += "/upvote" : url += "/downvote";

        if(this.modelType === "Post" || this.model.id === commentId){
          $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            success: function (data){
              model.set(model.parse(data));
              Discoverit.currentUser.votes[this.modelType + model.id] = vote;
              this.render({rerender: true});

              $(document).trigger("pageLoaded");
            }.bind(this),
            error: function (data){
              options && options.error && options.error(model, data, options);
            }
          });
        };
      };
    } else {      //if not signed in, bring up the modal
      $("#login").removeClass("hidden").addClass("modal");
    };
  }
};
