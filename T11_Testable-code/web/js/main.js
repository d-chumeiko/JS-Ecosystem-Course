window.init = function () {
  var $submit = $('#submit');
  var $login = $('#login');
  var $password1 = $('#password1');
  var $password2 = $('#password2');
  $login.change(function () {
    $.get('/checkLogin/' + $login.val(), function (response) {
      if (response.status.indexOf('alright') >= 0) {
        $login.css({'border-color': '#0c0'});
        $login.valid = true;
      } else {
        $login.css({'border-color': '#c00'});
        $login.valid = false;
      }
      unlockButton();
    });
  });

  $password2.change(function () {
    if ($password1.val() === $password2.val()) {
      $password2.css({'border-color': '#0c0'});
      $password1.valid = true;
    } else {
      $password2.css({'border-color': '#c00'});
      $password1.valid = false;
    }
    unlockButton();
  });

  function unlockButton() {
    if ($password1.valid && $login.valid) {
      $submit.removeAttr('disabled');
    } else {
      $submit.attr('disabled', 'disable');
    }
  }

  $submit.click(function (e) {
    e.preventDefault();
    $.post('/createAccount', $('#create-account-form').serialize(), function (response) {
      if (response.status === 'ok') {
        alert('Account Created Successfully');
      }
    });
  });
};

$(init);
