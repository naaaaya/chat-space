class GroupsController < ApplicationController
  before_action :authenticate_user!
  def index
    @groups = current_user.groups
  end

  def show
  end
  def new
    @group = Group.new
  end

  def create
    group = current_user.groups.create(group_params)
    user_ids = user_params[:user_ids].split(',')
    users =[]
    user_ids.each do|user_id|
      users << User.find(user_id) if user_id
    end
    group.users << users
    redirect_to root_path
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    @group.update(group_params)
    redirect_to root_path
  end

  private

  def user_params
    params.require(:group).permit(:user_ids)
  end

  def group_params
    params.require(:chat_group).permit(:name)
  end
end
