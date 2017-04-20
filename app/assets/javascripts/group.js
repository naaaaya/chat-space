$(function(){

  var result = $("#user-search-result");
  var preinput = ''
  var add_users = $("#hiddenID").data('ids');

  function appendSearchedList(user) {
    var item = $('<li class="chat-group-user searched_name" >'+user.name+'<p class = "chat-group-user__btn chat-group-user__btn--add" , data-user-id = '+user.id+', data-user-name = '+user.name+'>追加</p></li>' );
    result.append(item);
  };

  function appendAddedList(id, name) {
    var item = $('<li class="chat-group-user chat-group-user__name" >'+name+'<p class = "chat-group-user__btn chat-group-user__btn--remove" , data-user-id = '+id+', data-user-name = '+name+ '>削除</p></li>');
    $("#chat-group-users").append(item);
  };


  $('#chat_group_member').on('keyup', function() {
    var input = $(this).val();
    if (preinput != input){
      $('.searched_name').remove();
      $.ajax({
        type: 'GET',
        url: '/users.json',
        data:{
          keyword: input
        },
        dataType: 'json'
      })
      .done(function(users) {
        $.each(users, function(i, user){
          appendSearchedList(user);
        });
      })
      .fail(function() {
        alert('error');
      });
      preinput = input
    };
  });


  $(document).on('click', '.chat-group-user__btn--add', function() {
    user_id = $(this).data('userId');
    user_name = $(this).data('userName');
    appendAddedList(user_id, user_name);
    add_users.push(user_id);
    $("#hiddenID").val(add_users);
    $('.searched_name').remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove',  function() {
    user_id = $(this).data('userId');
    add_users.some(function(value, i){
      if (value == user_id) add_users.splice(i,1);
    });
    $("#hiddenID").val(add_users);
    $(this).parent().remove();
  });

});
