AutoForm.hooks({
    editPostForm: {

        before: {
            editPost: function(doc, template) {

                var post = doc;

                // ------------------------------ Checks ------------------------------ //

                if (!Meteor.user()) {
                    flashMessage(i18n.t('you_must_be_logged_in'), "");
                    return false;
                }

                // ------------------------------ Callbacks ------------------------------ //

                // run all post edit client callbacks on post object successively
                post = postEditClientCallbacks.reduce(function(result, currentFunction) {
                    return currentFunction(result);
                }, post);

                return post;
            }
        },

        onSuccess: function(operation, post, template) {

            //send data to contextOrionBroker:
            //* "41.385921, 2.168727"
            //* "41.385438, 2.163062"
            //* "41.385374, 2.179971"
            //* "41.383345, 2.169628"
            //* "41.385857, 2.159951"

            var lat = "41.385374"; //$("#latitud").val();
            var lng = "2.179971"; //$("#longitud").val();
            Meteor.call("createPoiInContextBroker", post._id, lat, lng);

            trackEvent("edit post", {'postId': post._id});
            Router.go('post_page', {_id: post._id});
        },

        onError: function(operation, error, template) {
            console.log(error)
            flashMessage(error.reason.split('|')[0], "error"); // workaround because error.details returns undefined
            clearSeenMessages();
        }

    }
});

// delete link
Template[getTemplate('post_edit')].events({
    'click .delete-link': function(e){
        var post = this.post;

        e.preventDefault();

        if(confirm("Are you sure?")){
            Router.go("/");
            Meteor.call("deletePostById", post._id, function(error) {
                if (error) {
                    console.log(error);
                    flashMessage(error.reason, 'error');
                } else {
                    flashMessage(i18n.t('your_post_has_been_deleted'), 'success');
                }
            });

            Meteor.call("deletePostByIdFromContextBroker", post._id);
        }
    }
});