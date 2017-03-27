$(function(){

  function buildHTML(message) {
    var html = '<div class = "chat-box"><h4>' + message.body + '</h4></div>';
    return html;
  }

  $('.chat-view__form .send-button').on('click', function(e) {
    e.preventDefault();
    var textField = $('.message-text-field');
    var message = textField.val();
    $.ajax({
      type: 'POST',
      url: './messages.json',
      data: {
        message: {
          body: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-view__history').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
    return false;
  });
});
