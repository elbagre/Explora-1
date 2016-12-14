class Api::UserActionsController < ApplicationController
  def create
    @user_action = UserAction.new(user_action_params)

    if @user_action.save
      render json: {}
    else
      render @user_action.errors.full_messages, status: 402
    end
  end

  def destroy
    @user_action = UserAction.find(params[:id])

    if @user_action.destroy
      render json: {}
    else
      render @user_action.errors.full_messages, status: 402
    end
  end

  def index
    @user_actions = UserAction.where("user_id = ?", current_user.id)
    render :index
  end

  private

  def user_action_params
    params.require(:user_action).permit(:user_id, :actionable_id, :actionable_type, :user_action)
  end
end
