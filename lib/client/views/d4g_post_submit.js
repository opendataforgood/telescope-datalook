/** overrided post_submit.js
 *
 * TODO
 *
 * - google maps object is not loaded (ERROR) - get proper datalook implementation
 * - Parametrize IP & code clean up.
 * - once retrieved projects if not approved or pending should not been shown
 * - improve nicer POIs information.
 * - http request are not shown in https embedded map!!
 * - set title and improve L&F into map viewer
 * - Add option in menu map
 *
 * - Prepare cloud for hosting site.
 * - move everything to proper datalook implementation
 *
 * */

AutoForm.hooks({

    submitPostForm: {

        before: {
            submitPost: function(doc, template) {

                template.$('button[type=submit]').addClass('loading');

                var post = doc;

                // ------------------------------ Checks ------------------------------ //

                if (!Meteor.user()) {
                    flashMessage(i18n.t('you_must_be_logged_in'), 'error');
                    return false;
                }

                // ------------------------------ Callbacks ------------------------------ //

                // run all post submit client callbacks on properties object successively
                post = postSubmitClientCallbacks.reduce(function(result, currentFunction) {
                    return currentFunction(result);
                }, post);

                return post;
            }
        },

        onSuccess: function(operation, post, template) {
            template.$('button[type=submit]').removeClass('loading');
            trackEvent("new post", {'postId': post._id});
            Router.go('post_page', {_id: post._id});
            if (post.status === STATUS_PENDING) {
                flashMessage(i18n.t('thanks_your_post_is_awaiting_approval'), 'success');
            }

            //send data to contextOrionBroker:
            //* "41.385921, 2.168727"
            //* "41.385438, 2.163062"
            //* "41.385374, 2.179971"
            //* "41.383345, 2.169628"
            //* "41.385857, 2.159951"

            var lat = $("#latitud").val();
            var lng = $("#longitud").val();
            Meteor.call("createPoiInContextBroker", post._id, lat, lng);

        },

        onError: function(operation, error, template) {
            template.$('button[type=submit]').removeClass('loading');
            flashMessage(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
            clearSeenMessages();
            // $(e.target).removeClass('disabled');
            if (error.error == 603) {
                var dupePostId = error.reason.split('|')[1];
                Router.go('post_page', {_id: dupePostId});
            }
        }

    }
});


