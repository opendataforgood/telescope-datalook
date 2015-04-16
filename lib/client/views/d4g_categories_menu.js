
Template.d4g_categories_menu.helpers({
  hasCategories: function(){
    return typeof Categories !== 'undefined' && Categories.find().count();
  },
  categories: function(){
    return Categories.find({}, {sort: { name: 1 }});
  },
  categoryLink: function () {
    return getSiteUrl()+'category/'+this.slug;
  }
});
