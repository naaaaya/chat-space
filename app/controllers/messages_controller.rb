class MessagesController < ApplicationController

  def create
    Message.create(message_params)
    redirect_to group_path(group_params)
  end

  private

  def message_params
    params.permit(:body,:group_id).merge(user_id: current_user.id)
  end

  def group_params
    @group = Group.find(params[:group_id])
  end
end
