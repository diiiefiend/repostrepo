window.Discoverit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  initialize: function() {
    this.currentUser = new Discoverit.Models.CurrentUser();
    this.currentUser.fetch();

    this.userMenu = new Discoverit.Views.UserMenu({el: "#header #account-links"});

    new Discoverit.Routers.Router({$el: $("#cont")});
    Backbone.history.start();
  },

  switchColors: function (){

    var processColors = function (data){
      //data comes back as an array with 1 object
      var paletteObj = data[0];
      paletteTitle = paletteObj.title;
      paletteColors = paletteObj.colors;
      console.log(paletteTitle);
      console.log(paletteColors);

      swapColors(paletteColors);
    };

    var swapColors = function (colors){
      // colors is an array of 5 values

      // this will sort darkest to lightest
      colors = colors.sort();
      console.log(colors);

      var colorsHex = colors.map(function (color){
        return "#" + color;
      });

      // darkest color
      var bgColor = colorsHex[0];
      $("body").css("background", bgColor);
      $("#header").css("background", bgColor);
      $("#footer p").css("color", bgColor);

      // second darkest
      var footerColor = colorsHex[1];
      $("#footer").css("border-top-color", footerColor);
      $("#footer p").css("background", footerColor);

      // middle color
      var accentColor = colorsHex[2];
      $("#header h1 a em").css("color", accentColor);
      $("a").css("color", accentColor);

      // second lightest
      var contColor = colorsHex[3];
      $("#cont").css("background", contColor);

      // lightest color
      var headerColor = colorsHex[4];
      $("#header").css("border-bottom-color", headerColor);
      $("#header h1 a").css("color", headerColor);
      $("#footer p").css("color", headerColor);
      $("#footer a").css("color", headerColor);

      // currently these don't propagate to further pages (prob need to have these be set every time a page loads--fire off a custom event)
      $(".vote_container p").css("color", headerColor);
      $(".votable li").css("background", headerColor);
    };

    $.ajax({
      method: 'GET',
      url: "http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=processColors",
      dataType: 'jsonp',
      jsonp: 'false',
      jsonpCallback: 'processColors',
      success: function(data){
        processColors(data);
      },
      error: function(xhr, status, error){
        console.log(error);
      }
    });
  }
};
