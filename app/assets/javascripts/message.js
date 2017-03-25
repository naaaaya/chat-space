$(function(){
  $('.chat-view__form .send-button').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.message-text-field');
    var message = textField.val();
    $.ajax({
      type: 'POST',
      url: group_messages_path,
      data: {
        message: {
          content: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});

