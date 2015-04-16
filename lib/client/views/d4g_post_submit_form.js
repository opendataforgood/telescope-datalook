
Template.d4g_post_submit_form.helpers({
  hasGoogleApiKey: function () {
    return !!Settings.get('googleMapsAPI');
  },
  isPostEdit: function () {
    return (Router.current().route.getName() === 'post_edit');
  }
});

Template.d4g_post_submit_form.rendered = function () {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $('#location').geocomplete()
        .bind('geocode:result', function(event, result) {
          var loc = result.geometry.location,
              lat = loc.lat(),
              lng = loc.lng();

          // Fill in the hidden lat/long form fields
          $('#latitude').val(lat);
          $('#longitude').val(lng);
        });
    }
  });
};
