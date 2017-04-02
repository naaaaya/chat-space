$(function(){

  var result = $("#user-search-result");
  var preinput = ''
  var add_users = []

  function appendSearchedList(user) {
    var item = $(`<li class="chat-group-user searched_name", data-user-id = ${user.id}, data-user-name = ${user.name} > ${user.name} <p class = "chat-group-user__btn chat-group-user__btn--add">追加</p></li>` );
    result.append(item);
  };

  function appendAddedList(name) {
    var item = $(`<li class="chat-group-user chat-group-user__name",data-user-name = ${name}> ${name} <p class = "chat-group-user__btn chat-group-user__btn--remove">削除</p></li>`);
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
      .done(function(data) {
        users = data
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
    var list = $(this).parents()
    user_id = list.data('userId');
    user_name = list.data('userName');
    appendAddedList(user_name);
    add_users.push(user_id);
    $("#hiddenID").val(add_users);
    $('.searched_name').remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove',  function() {
    var list = $(this).parents()
    user_id = button.data('userId');
    add_users.some(function(value, i){
      if (value == user_id) add_users.splice(i,1);
    });
    list.remove();
  });



});
