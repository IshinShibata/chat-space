$(function() {

var search_list = $("#user-search-result");
function appendUser(user) {
   var html =
`
  <div id="user-search-result">
  <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${ user.name }>追加</a>
  </div>
  </div>
`
search_list.append(html);
}

function appendNoUser(user){
    var html =
`<div class="chat-group-user clearfix">${user}</div>`
$("#user-search-result").append(html)
}

function addUser(name,id) {
    var html =
`
  <div class ='chat-group-user clearfix js-chat-member' id= 'chat-group-user-${id}'>
    <input name = 'group[user_ids][]', type = 'hidden', value = '${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${id} data-user-name=${name}> 削除</a>
  </div>
`
  $("#chat-group-users").append(html)
}

$("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
   .done(function(users) {
     $("#user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendNoUser("一致するUserはいません");
     }
  })
   .fail(function(){
        alert('ユーザー検索に失敗しました')
     })
});

$("#user-search-result").on("click", ".chat-group-user__btn--add", function(e) {
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    addUser(name,id);
    $(this).parent().remove();
})

$("#chat-group-users").on("click", ".js-remove-btn", function(e) {
    $(this).parent().remove();
})

});
