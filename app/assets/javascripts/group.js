$(function(){

  var result = $("#user-search-result");
  var preinput = ''
  var add_users = []

  function appendSearchedList(user, index) {
    var item = $('<li class="chat-group-user searched_name" id ='+ index +'>').append(user.name + '<p class = "chat-group-user__btn chat-group-user__btn--add">追加');
    result.append(item);
  };

  function appendAddedList(user, index) {
    var item = $('<li class="chat-group-user chat-group-user__name", id ='+ index +'>').append(user.name + '<p class = "chat-group-user__btn chat-group-user__btn--remove">削除');
    $("#chat-group-users").append(item);
  };


  $('#chat_group_member').on('keyup', function() {
    var input = $(this).val();
    if (preinput != input ){
    $('.searched_name').remove();
    $.ajax({
      type: 'GET',
      url: '/users.json',
      data:{
        keyword: input
      },
      dataType: 'json'
    })
    .done(function(data) {
      users = data
      $.each(users, function(i, user){
        appendSearchedList(user,i);
      });
    })
    .fail(function() {
      alert('error');
    });
  preinput = input
  };
  });


  $(document).on('click', '.chat-group-user__btn--add', function() {
    user_id = $(this).parent().attr('id');
    user = users[user_id];
    appendAddedList(user, user_id);
    add_users.push(user.id);
     $("#hiddenID").val(add_users);
    $('.searched_name').remove();
    console.log(add_users);
  });

  $(document).on('click', '.chat-group-user__btn--remove',  function() {
    user_id = $(this).parent().attr('id');
    delete_user = users[user_id];
    add_users.some(function(value, i){
      if (value == delete_user.id) add_users.splice(i,1);
      console.log('deleted');
    });
    $(this).parent().remove();
    console.log(add_users);

  });



});
