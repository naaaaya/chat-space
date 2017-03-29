$(function(){

  var result = $("#user-search-result");

  function appendSearchedList(word) {
    var item = $('<li class="chat-group-user searched_name">').append(word + '<p class = "chat-group-user__btn chat-group-user__btn--add">追加');
    result.append(item);
  };
  function appendAddedList(word) {
    var item = $('<li class=".chat-group-user__name">').append(word + '<p class = "chat-group-user__btn chat-group-user__btn--remove">削除');
    $("#chat-group-users").append(item);
  };


    $(document).on('click', '.chat-group-user__btn--add',  function() {
      user = $(this).parent().text();
      console.log(user);
      appendAddedList(user);
       $('.searched_name').remove();
    });

  $('#chat_group_member').on('keyup', function(e) {
    e.preventDefault();
    var textField = $('#chat_group_member');
    var name = textField.val();
    console.log(name);
  $('.searched_name').remove();
    $.ajax({
      type: 'GET',
      url: './new.json',
      dataType: 'json'
    })
    .done(function(users) {
      $.each(users, function(i, user){
        user_name = user.name
        if (user_name.match("^" + name)) {
          appendSearchedList(user_name);
      };
      });
    })
    .fail(function() {
      alert('error');
    });
  });



});
