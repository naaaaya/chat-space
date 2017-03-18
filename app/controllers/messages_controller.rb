class MessagesController < ApplicationController

  def index
    @groups = current_user.groups
    @group = Group.find(group_params)
    @messages =@group.messages
    @message = Message.new
  end

  def create
    message = Message.create(message_params)
    if message.valid? == false
      flash[:notice] = 'メッセージを入力してください'
    end
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
