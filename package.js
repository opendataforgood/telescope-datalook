
Package.describe({
  name: 'telescope-datalook',
  summary: 'Telescope module for DataLook.io',
  version: '0.1.0',
  git: 'https://github.com/jshimko/telescope-datalook.git'
});

Package.onUse(function (api) {

  Npm.depends({
    "twit": "1.1.19"
  });

  api.use([
    'templating',
    'ui',
    'jquery',
    'bengott:avatar',
    'jeremy:velocity-animate',
    'dburles:google-maps',
    'jeremy:geocomplete',
    'jeremy:telescope-plugin-hero'
    ], 'client');

  api.use([
    'telescope-lib',
    'telescope-base',
    'telescope-newsletter',
    'telescope-search',
    'telescope-settings',
    'telescope-tags',
    'iron:router',
    'http',
    'aldeed:collection2',
    'aldeed:simple-schema',
    'aldeed:autoform',
    'meteorhacks:npm',
    'meteorhacks:fast-render',
    'meteorhacks:subs-manager',
    'aslagle:reactive-table',
    'jeremy:segment.io'
    ], ['client', 'server']);

  api.use('cmather:handlebars-server');

  var path = Npm.require('path'),
      asset_path = path.join('lib/client');

  /*
  *  Client
  */
  api.addFiles([

    // Styles
    'lib/client/css/screen.css',

    // Icon fonts
    path.join(asset_path, 'fonts', 'icomoon.eot'),
    path.join(asset_path, 'fonts', 'icomoon.ttf'),
    path.join(asset_path, 'fonts', 'icomoon.svg'),
    path.join(asset_path, 'fonts', 'icomoon.woff'),

    // Vendor
    'lib/client/vendor/drop.js',

    // Config
    'lib/client/config/avatar.js',

    // Helpers
    'lib/client/helpers/spacebars.js',

    // Layouts
    'lib/client/views/d4g_layout.html',
    'lib/client/views/layouts/full_width_layout.html',
    'lib/client/views/layouts/full_width_layout.js',
    'lib/client/views/layouts/press_layout.html',
    'lib/client/views/layouts/press_layout.js',

    // Templates
    'lib/client/views/main.html',
    'lib/client/views/custom_templates.js',
    'lib/client/views/d4g_atForm.js',
    'lib/client/views/d4g_nav.html',
    'lib/client/views/d4g_search.html',
    'lib/client/views/d4g_userMenu.html',
    'lib/client/views/d4g_categories_menu.html',
    'lib/client/views/d4g_categories_menu.js',
    'lib/client/views/d4g_posts_list.html',
    'lib/client/views/d4g_posts_list.js',
    'lib/client/views/d4g_postAuthor.html',
    'lib/client/views/d4g_postInfo.html',
    'lib/client/views/d4g_postUpvote.html',
    'lib/client/views/d4g_post_content.html',
    'lib/client/views/d4g_post_tagline.html',
    'lib/client/views/d4g_post_tagline.js',
    'lib/client/views/d4g_post_discuss.html',
    'lib/client/views/d4g_post_submit_form.html',
    'lib/client/views/d4g_post_submit_form.js',
    'lib/client/views/d4g_post_submit.html',
    'lib/client/views/d4g_post_submit.js', //overwrites post_submit.js
    'lib/client/views/d4g_post_edit.html',
    'lib/client/views/d4g_post_edit.js', //overwrites post_edit.js
    'lib/client/views/d4g_button_bar.html',
    'lib/client/views/d4g_user_profile.html',
    'lib/client/views/d4g_userInfo.html',
    'lib/client/views/d4g_userInfo.js',
    'lib/client/views/d4g_user_edit.html',
    'lib/client/views/d4g_user_edit.js',
    'lib/client/views/d4g_newsletterBanner.html',
    'lib/client/views/d4g_newsletter_signup.html',
    'lib/client/views/d4g_newsletter_signup.js',
    'lib/client/views/d4g_map.html',

    // Pages
    'lib/client/views/pages/about.html',
    'lib/client/views/pages/praise/praise.html',
    'lib/client/views/pages/praise/praise.js',
    'lib/client/views/pages/praise/praise_submit.html',
    'lib/client/views/pages/praise/praise_submit.js',
    'lib/client/views/pages/praise/praise_edit.html',
    'lib/client/views/pages/praise/praise_edit.js',
    'lib/client/views/pages/praise/praise_list.html',
    'lib/client/views/pages/praise/praise_list.js',
    'lib/client/views/pages/press.html',
    'lib/client/views/pages/press.js',

    // Libs
    'lib/client/js/noty.js'

  ], 'client');


  /*
  *  Server
  */
  api.addFiles([
    'lib/server/methods.js',
    'lib/server/publications.js',
    'lib/server/seed.js',
    'lib/server/email/d4g_emailWrapper.handlebars',
    'lib/server/email/d4g_emailDigest.handlebars',
    'lib/server/email/d4g_emailPostItem.handlebars',
    'lib/server/email/d4g_emailNewPost.handlebars',
    'lib/server/email/custom_email_templates.js'
  ], 'server');


  /*
  *  Client & Server
  */
  api.addFiles([
    'lib/collections.js',
    'lib/router/routes.js'
  ], ['client', 'server']);


  /*
  *  Exports
  */
  api.export([
    'Notify',
    'Praises'
  ]);

});
