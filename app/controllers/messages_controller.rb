class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :defines_groups_messages_variables, only: [:index, :create]
  def index
    @message = Message.new
  end

  def create
    @message = current_user.messages.new(message_params)
    @name = @message.user.name
    if @message.save
      respond_to do |format|
        format.html {redirect_to :group_messages}
        format.json {render json: [@message,@name]}
      end
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
