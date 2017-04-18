class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :defines_groups_messages_variables, only: [:index, :create]
  protect_from_forgery except: [:index, :create]
  def index
    @message = Message.new
    group = Group.find(params[:group_id])
    @users = group.users
    @messages = group.messages
    last_message_id = params[:last_message]
    @unloaded_messages = group.messages.where("id > #{last_message_id}") if last_message_id
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = current_user.messages.new(message_params)
    @user = @message.user
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      flash.now[:notice] = 'メッセージを入力してください'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id])
  end

end
