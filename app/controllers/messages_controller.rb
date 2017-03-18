class MessagesController < ApplicationController

  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @messages =@group.messages
    @message = Message.new
  end

  def create
    message = current_user.messages.create(message_params)
    binding.pry
    if message.persisted?
      redirect_to group_path(@group)
    else
      flash[:notice] = 'メッセージを入力してください'
      redirect_to group_path(@group)
    end
  end

  private

  def message_params
    params.permit(:body,:group_id)
  end

end
