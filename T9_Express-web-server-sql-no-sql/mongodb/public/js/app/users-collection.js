define([
    'backbone'
    , 'app/users-model'
], function(Backbone, UsersModel){
    return Backbone.Collection.extend({

        model: UsersModel,
        url: '/api/users',

        parse: function(resp){
            this.total = resp.total;
            return resp.collection;
        }
    });
});