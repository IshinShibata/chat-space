$(function(){
  function buildHTML(message){
    var buildImage = '';
  if (message.image) {
    buildImage = `<img src="${message.image}">`;
  }
  var html =`
<div class="message">
  <div class="message__content">
    <div class="message__content__name">${message.user_name}</div>
    <div class="message__content__daily">${message.created_at}</div>
  </div>
  <div class="message__comment">
      ${message.content}
      ${buildImage}
  </div>
</div>
`
    return html;
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
      $('.formarea__forms__form').val('');
     $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1000, 'swing');
      $('.formarea__forms__submit-button').prop("disabled", false);
    })
    .fail(function(){
      alert('error');
})
})
});
