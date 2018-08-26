class LikesController < ApplicationController
  def create
    @message = Message.find(params[:message_id])
    @message.likes.create(user_id: current_user.id)
    @likes = Like.where(message_id: params[:message_id])
    respond_to do |format|
      format.html { redirect_to (:back) }
      format.js
    end
  end

  def destroy
    @message = Message.find(params[:message_id])
    like = Like.find_by(user_id: current_user.id, message_id: params[:message_id])
    like.destroy
    @likes = Like.where(message_id: params[:message_id])
    respond_to do |format|
      format.html { redirect_to (:back) }
      format.js
    end
  end

end

