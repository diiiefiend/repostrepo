Discoverit.Views.SubsIndex = Backbone.CompositeView.extend({
  template: JST['subs/subsIndex'],

  initialize: function (options){
    if(options && options.sidebar){
      this.sidebar = true;
    } else {
      this.sidebar = false;
    };

    this.collection = new Discoverit.Collections.Subs();
    this.collection.fetch();

    this.listenTo(this.collection, "sync", this.render);
  },

  render: function (){
    var template = this.template({subs: this.collection, sidebar: this.sidebar});
    this.$el.html(template);
    return this;
  }
});
