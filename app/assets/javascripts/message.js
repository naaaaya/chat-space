$(function(){

  setInterval(function(){
    var last_message = $('.chat-box').last().data('id');
    $.ajax({
      type: 'GET',
      url: './messages.json',
      data:{
        last_message: last_message
      },
      dataType: 'json'
    })
    .done(function(data) {
      if (data){
        var messages = data.messages;
        $.each(messages, function(index, message){
          var html = appendMessage(message);
          $('.chat-view__history').append(html);
        });
      };
    });
  },3000);

  function appendMessage(message) {
    if (message.body){
      var html = `<div class = "chat-box", data-id:${message.id}>
                    <h3>${message.name}</h3>
                    <p>${message.created_at}</p>
                    <h4>${message.body}</h4>
                  </div>`;
    } else {
      var html = `<div class = "chat-box", data-id: ${message.id}>
                    <h3>${message.name}</h3>
                    <p>${message.created_at}</p>
                    <h4><img src=${message.image}></h4>
                  </div>`;
    }
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
      var html = appendMessage(data);
      $('.chat-view__history').append(html);
      $(".send-button").prop("disabled", false);
      $(".send-button").attr('value', 'Send');
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});
