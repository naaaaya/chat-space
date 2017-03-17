class MessagesController < ApplicationController

  def create
    Message.create(message_params)
    redirect_to group_path(id:params[:group_id])
  end

  private

  def message_params
    params.permit(:body,:group_id).merge(user_id: current_user.id)
  end

end
