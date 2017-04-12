$(function(){

  function appendMessage(message) {
    var html = `<div class = "chat-box"><h3>${message.name}</h3><p>${message.created_at}</p><h4>${message.body}</h4></div>`;
    return html;
  };

  function appendImage(message) {
    var html = `<div class = "chat-box"><h3>${message.name}</h3><p>${message.created_at}</p><h4><img src=${message.image.url}></h4></div>`;
    return html;
  };

  $('#image_icon').on('click', function(e){
    e.preventDefault();
    $('#message_image').click();
  })

  $('#message_image').on('change', function(e){
    e.preventDefault();
    $('.chat-view__form .send-button').submit()
  });

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var textField = $('.message-text-field');
    var formData = new FormData($(this).get(0));
    $.ajax({
      type: 'POST',
      url: './messages.json',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      if (data.body) {
      var html = appendMessage(data);
      $('.chat-view__history').append(html);
      textField.val('');
    } else{
      var html = appendImage(data);
      $('.chat-view__history').append(html);
      textField.val('');
    }
    })
    .fail(function() {
      alert('error');
    });
  });
});