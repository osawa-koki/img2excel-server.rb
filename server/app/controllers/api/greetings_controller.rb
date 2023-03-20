class Api::GreetingsController < Api::ApiController
  def index
    http_method = request.method
    message = "Hello #{http_method}."
    render json: { message: message }
  end
end
