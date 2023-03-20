class Api::UserController < Api::ApiController
  def get
    @users = User.all
    render json: @users
  end

  def post
    user = User.create(user_params)
    render json: user, status: :created
  end

  def put
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
      render json: { error: 'Failed to update user' }, status: :unprocessable_entity
    end
  end

  def delete
    @user = User.find(params[:id])
    if @user.destroy
      render json: { message: 'User deleted' }, status: :ok
    else
      render json: { error: 'Failed to delete user' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :age, :profession)
  end
end
