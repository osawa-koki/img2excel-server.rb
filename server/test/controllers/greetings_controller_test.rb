require 'test_helper'

class GreetingsControllerTest < ActionDispatch::IntegrationTest
  test "should get greet with GET method" do
    method_name = "GET"
    get "/api/greet", params: { method_name: method_name }
    assert_response :success
    response_data = JSON.parse(response.body)
    assert_equal "Hello #{method_name}.", response_data["message"]
  end

  test "should get greet with POST method" do
    method_name = "POST"
    post "/api/greet", params: { method_name: method_name }
    assert_response :success
    response_data = JSON.parse(response.body)
    assert_equal "Hello #{method_name}.", response_data["message"]
  end

  test "should get greet with PUT method" do
    method_name = "PUT"
    put "/api/greet", params: { method_name: method_name }
    assert_response :success
    response_data = JSON.parse(response.body)
    assert_equal "Hello #{method_name}.", response_data["message"]
  end

  test "should get greet with DELETE method" do
    method_name = "DELETE"
    delete "/api/greet", params: { method_name: method_name }
    assert_response :success
    response_data = JSON.parse(response.body)
    assert_equal "Hello #{method_name}.", response_data["message"]
  end
end
