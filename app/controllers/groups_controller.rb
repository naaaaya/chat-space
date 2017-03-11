class GroupsController < ApplicationController
  def new
    @group = Group.new
    @group.users.build
  end

  def create
    @users =[]
    group = Group.create(group_params)
    user_ids = user_params[:user_ids]
    user_ids.each do|user_id|
      @users << User.find(user_id) if user_id
    end
    @users.each do |user|
      user.groups << group
    end

    redirect_to root_path
  end

  def edit
  end

  def update
  end

  private

  def user_params
    params.require(:group).permit(user_ids:[])
  end

  def group_params
    params.require(:chat_group).permit(:name)
  end
end
