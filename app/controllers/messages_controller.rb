class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :defines_groups_messages_variables, only: [:index, :create]
  def index
    @message = Message.new
  end

  def create
    @message = current_user.messages.create(message_params)

    if @message.persisted?
      redirect_to group_messages_path(@group)
    else
      flash.now[:notice] = 'メッセージを入力してください'


      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body).merge(group_id: params[:group_id])
  end

end
