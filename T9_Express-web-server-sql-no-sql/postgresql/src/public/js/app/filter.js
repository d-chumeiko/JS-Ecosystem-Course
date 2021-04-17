define([
    'backbone'
    , 'text!app/filter.tpl'
], function(Backbone, tpl){

    return Backbone.View.extend({
        template: _.template(tpl),

        events: {
            'submit': '_filter',
            'click a': '_reset'
        },

        initialize: function(opts){
            this.requestConfig = opts.requestConfig;
        },

        render: function(){
            this.$el.html(this.template({
                requestConfig: this.requestConfig,
                options: [{
                    value: '',
                    name: 'Filter by field'
                }, {
                    value: 'firstName',
                    name: 'First Name'
                }, {
                    value: 'lastName',
                    name: 'Last Name'
                }, {
                    value: 'company',
                    name: 'Company'
                }, {
                    value: 'position',
                    name: 'Job Position'
                }, {
                    value: 'email',
                    name: 'Email'
                }, {
                    value: 'phoneNumber',
                    name: 'Phone Number'
                }]
            }));

            return this;
        },

        _filter: function(e){
            e.preventDefault();
            var searchValue = this.$('.search-value').val();
            var searchBy = this.$('.search-by').val();

            if(!searchBy && searchValue || searchBy && !searchValue){
                alert('You have to specify both search criterias');
                return;
            }

            this.requestConfig.searchValue = searchValue;
            this.requestConfig.searchBy = searchBy;
            this.requestConfig.offset = 1;
            Backbone.Events.trigger('usersCollectionWasModified');
        },

        _reset: function(e){
            e.preventDefault();

            this.requestConfig.searchValue = '';
            this.requestConfig.searchBy = '';
            this.requestConfig.offset = 1;
            Backbone.Events.trigger('usersCollectionWasModified');
        }
    });
});