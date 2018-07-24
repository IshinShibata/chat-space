$(function(){
  function buildHTML(message){
    var buildImage = '';

    if (message.image) {
        buildImage = `<img src="${message.image}">`;
    }
    var html =`
      <div class="message" data-message-id="${message.id}">
        <div class="message__content">
          <div class="message__content__name">${message.user_name}</div>
          <div class="message__content__daily">${message.created_at}</div>
        </div>
        <div class="message__comment">
          ${message.content}
          ${buildImage}
        </div>
      </div>`
    return html;
  }

function scrollDown(){
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, {duration: 1000});
}

  $('#item_form').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);

      $('.messages').append(html);
      $('#item_form')[0].reset();
      scrollDown();
      $('.formarea__forms__submit-button').prop("disabled", false);
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(function() {
  if(window.location.pathname.match(/\/groups\/\d+\/messages/)){
    var lastId = $('.message').last().data("message-id");

    $.ajax({
      url: location.pathname,
      type: "GET",
      dataType: 'json',
      data: {lastId:lastId},
      contentType: false
    })
    .done(function(json) {

      var insertHTML = '';

      json.messages.forEach(function(message){
        insertHTML += buildHTML(message);
        $('.messages').append(insertHTML);
      });

      scrollDown();
    })
    .fail(function(data) {
     alert('自動更新に失敗しました');
    });
  }
    else {
    clearInterval(interval);
  }
  } , 2000 );

});

