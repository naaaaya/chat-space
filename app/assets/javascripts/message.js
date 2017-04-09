$(function(){
  function buildHTML(message) {
    console.log(`${message.name}さんのメッセージ：${message.body}`);
    var html = `<div class = "chat-box"><h3>${message.name}</h3><p>${message.created_at}<h4>${message.body}</h4></div>`;
    return html;
  };

  $('i').on('click', function(e){
    e.preventDefault();
    $('#message_image').click();
  })

  $('#message_image').on('change', function(e){
    e.preventDefault();
    $('.chat-view__form .send-button').click()
  });

  $(document).on("click",".chat-view__form .send-button", function(e){
    e.preventDefault();
    // var textField = $('.message-text-field');
    // var message = textField.val();
    var formData = new FormData($(this).get(0));
    console.log(formData);
    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }
    $.ajax({
      type: 'POST',
      url: './messages.json',
      // data: {
      //   message: {
      //     body: message
      //   }
      // },
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-view__history').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});