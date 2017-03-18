class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
   before_action :configure_permitted_parameters, if: :devise_controller?

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end

    def defines_groups_messages_variables
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @messages =@group.messages
    end
end
