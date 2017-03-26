$(function(){

  function buildHTML(message) {
    var html = $('<li class= "message">').append(message.content);
    return html;
  }

  $('.chat-view__form .send-button').on('click', function(e) {
    e.preventDefault();
    var textField = $('.message-text-field');
    var message = textField.val();
    $.ajax({
      type: 'POST',
      url: '/messages.json',
      data: {
        message: {
          content: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-box').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
    return false;
  });
});
