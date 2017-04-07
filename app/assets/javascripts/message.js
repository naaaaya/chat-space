$(function(){

  function buildHTML(message) {
    var html = `<div class = "chat-box"><h3>${message.name}</h3><p>${message.created_at}<h4>${message.body}</h4></div>`;
    return html;
  };

  $('i').on('click', function(){
    console.log('pressed!');
    $('#message_image').click();
  })

  $('#message_image').on('change', function(){
    $('.chat-view__form .send-button').click()
  });

  $('.chat-view__form .send-button').on('click', function(e){
    e.preventDefault();
    var message = $('.message-text-field').val();
    console.log($('.chat-view__form').get(0))
    var formData = new FormData($('.chat-view__form').get(0));
    console.log(formData);
    console.log('message is just sent');
    $.ajax({
      type: 'POST',
      url: './messages.json',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log('SUCCESS!');
      var html = buildHTML(data);
      $('.chat-view__history').append(html);
      textField.val('');
    })
    .fail(function() {
      console.log('FAILED!!!');
      $('header').text('メッセージを入力してください')
    });
  });
});
