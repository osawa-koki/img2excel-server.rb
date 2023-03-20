class Api::HelloController < Api::ApiController
  def index
    name = params[:name]
    message = "Hello #{name}."
    render json: { message: message }
  end
end
