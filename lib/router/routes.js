
/*
*  Config
*/

var isAdmin = function(user) {
  user = (typeof user === 'undefined') ? Meteor.user() : user;
  return !!user && !!user.isAdmin;
};

// Must be admin to access route
var adminRequired = function() {
  if(!this.ready()) return;
  if(!isAdmin()){
    this.render('no_rights');
  } else {
    this.next();
  }
}

Router.onBeforeAction(adminRequired, {
  only: [
    'praise_list',
    'praise_submit',
    'praise_edit'
  ]
});


/*
*  Controllers
*/

PraisesController = RouteController.extend({
  waitOn: function() {
    return Meteor.subscribe('praises');
  },
  data: function() {
    return {
      praises: Praises.find()
    }
  },
  onRun: function() {
    Telescope.pageview({
      title: 'DataLook - Praise',
      path: '/praise',
      url: window.location.host + '/praise'
    });
    this.next();
  }
});

PraisesUpdateController = RouteController.extend({
  waitOn: function () {
    var id = this.params._id;
    return Meteor.subscribe('praise', id);
  },
  data: function () {
    var id = this.params._id;
    var praise = Praises.findOne({_id: id});
    return praise;
  },
  action: function () {
    this.render();
  }
});

PressController = RouteController.extend({
  layoutTemplate: 'press_layout',
  waitOn: function() {
    return [Meteor.subscribe('postsCount'),
            Meteor.subscribe('usersCount')]
  },
  fastRender: true
});


Router.onBeforeAction(function() {
  var googleMapsAPI = Settings.get('googleMapsAPI');
  if (googleMapsAPI) {
    GoogleMaps.load({
      key: googleMapsAPI,
      libraries: 'places'
    });
  } else {
    clog("Please enter a Google Maps API key on the settings page to enable the location field.");
  }
  this.next();
}, { only: ['post_submit', 'post_edit'] });

/*
*  Routes
*/

Meteor.startup(function () {

  Router.route('/about', {
    onRun: function() {
      Telescope.pageview({
        title: 'DataLook - About',
        path: '/about',
        url: window.location.host + '/about'
      });
      this.next();
    }
  });

  Router.route('/praise', {
    controller: PraisesController
  });

  Router.route('/praise/list', {
    name: 'praise_list',
    controller: PraisesController
  });

  Router.route('/praise/new', {
    name: 'praise_submit'
  });

  Router.route('/praise/:_id/edit', {
    name: 'praise_edit',
    controller: PraisesUpdateController
  });

  Router.route('/press');

  Router.route('/newsletter', function(){
    this.render('d4g_newsletterSignup');
  });

  Router.route('/map', function(){
    this.render('d4g_map');
  });

  Router.route('/users', {
    name: 'users',
    template: getTemplate('users'),
    onRun: function() {
      Telescope.pageview({
        title: 'DataLook - Users',
        path: '/users',
        url: window.location.host + '/users'
      });
      this.next();
    }
  });
});
