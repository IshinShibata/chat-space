  json.id  @message.id
  json.content  @message.content
  json.user_id  @message.user.id
  json.user_name  @message.user.name
  json.created_at  @message.created_at.to_s(:human)
  json.image  @message.image.url
