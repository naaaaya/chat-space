class MessagesController < ApplicationController

  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @messages =@group.messages
    @message = Message.new
  end

  def create
    @group = Group.find(params[:group_id])
    message = current_user.messages.create(message_params)
    if message.persisted?
      redirect_to group_messages_path(@group)
    else
      flash[:notice] = 'メッセージを入力してください'
      redirect_to group_messages_path(@group)
    end
  end

  private

  def message_params
    params.require(:message).permit(:body).merge(group_id:params[:group_id])
  end

end
