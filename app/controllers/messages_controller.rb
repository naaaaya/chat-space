  class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :defines_groups_messages_variables, only: [:index, :create]
  def index
    @message = Message.new
    @users = Group.find(params[:group_id]).users
      end

  def create
    @message = current_user.messages.new(message_params)
    @user = @message.user
    unless @message.save
      flash.now[:notice] = 'メッセージを入力してください'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id])
  end

end
