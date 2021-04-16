'use strict';

const $ = require('jquery');

import '../styles/main.scss';

// Application initialization
$(() => {
    $('.j-appVersion').html(':)');

    $.ajaxSetup({ cache: true });
});
