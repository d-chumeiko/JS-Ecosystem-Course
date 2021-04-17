define([
    'backbone'
    , 'text!app/pagination.tpl'
], function (Backbone, tpl) {
    'use strict';

    return Backbone.View.extend({

        template: _.template(tpl),

        events: {
            'click .pagination .disabled a, .pagination .active a': 'goPrevent',
            'click .pagination .page a': 'goPage',
            'change select': '_updatePerPage'
        },

        //useQuery: true,

        initialize: function (opts) {
            this.collection = opts.collection;
            this.requestConfig = opts.requestConfig;
        },

        render: function (data) {
            if(!this.collection.size()){
                this.$el.empty();
                
                return this;
            }

            var html,
                totalAmount = this.collection.total,
                perPage = this.requestConfig.perPage,
                offset = this.requestConfig.offset,
                totalPages = Math.ceil(totalAmount / perPage),
                uppermostPageInView = perPage * offset,
                lowermostPageInView = uppermostPageInView - perPage + 1;

            if (uppermostPageInView > totalAmount) {
                uppermostPageInView = totalAmount;
            }

            html = this.template({
                perPage: perPage,
                totalPages: totalPages,
                totalAmount: totalAmount,
                offset: offset,
                isPaginationShown: totalPages > 1,
                isDropdownShown: totalAmount > perPage,
                uppermostPageInView: uppermostPageInView,
                lowermostPageInView: lowermostPageInView,
                helperWritePages: _.bind(this._writePages, this)
            });

            this.$el.html(html);

            return this;
        },
        
        _writePages: function(totalPages, offset){
            var html = '',
                startPage,
                endPage,
                i;

            if(totalPages <= this.requestConfig.perPage){
                // case when there are less pages then limit
                startPage = 1;
                endPage = totalPages;
            } else{
                if (offset <= Math.ceil(this.requestConfig.perPage / 2)) {
                    // [1 2 3 4 5] 6 7 8 9 ...
                    //      ^ offset is equal to or less than middle of first available page range
                    startPage = 1;
                    endPage = this.requestConfig.perPage;
                } else if (offset >= totalPages - Math.floor(this.requestConfig.perPage / 2)) {
                    // 1 2 3 4 [5 6 7 8 9] ...
                    //              ^ offset is equal to or greater than middle of last available page range
                    startPage = totalPages - this.requestConfig.perPage + 1;
                    endPage = totalPages;
                } else{
                    // 1 2 3 [4 5 6 7 8] 9 ...
                    //            ^ offset is in middle of non-edge page range
                    startPage = offset - Math.floor(this.requestConfig.perPage / 2);
                    endPage = offset + Math.floor(this.requestConfig.perPage / 2);
                }
            }

            for(i = startPage; i <= endPage; i++){
                html += '<li class="' + (i == offset ? 'active' : 'page') + '"><a href="#' + i  + '">' + i  + '</a></li>';
            }

            return html;
        },

        goPrevent: function (e) {
            e.preventDefault();
        },

        goPage: function (e) {
            e.preventDefault();

            this.requestConfig.offset = parseInt(e.target.hash.replace('#', ''));
            Backbone.Events.trigger('usersCollectionWasModified');
        },

        _updatePerPage: function (e) {
            this.requestConfig.perPage = parseInt($(e.target).val());
            this.requestConfig.offset = 1;
            Backbone.Events.trigger('usersCollectionWasModified');
        }
    });
});
