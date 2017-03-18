class MessagesController < ApplicationController

  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @messages =@group.messages
    @message = Message.new
  end

  def create
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @message = current_user.messages.create(message_params)
    @messages =@group.messages
    if @message.persisted?
      redirect_to group_messages_path(@group)
    else
      flash.now[:notice] = 'メッセージを入力してください'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body).merge(group_id:params[:group_id])
  end

end
