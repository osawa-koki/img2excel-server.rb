require 'test_helper'

class HelloControllerTest < ActionDispatch::IntegrationTest
  data = ["hogehoge", "fugafuga", "piyopiyo"]

  data.each do |name|
    test "should return hello message for #{name}" do
      get "/api/hello/#{name}"
      assert_response :success

      response_data = JSON.parse(response.body)
      assert_equal "Hello #{name}.", response_data["message"]
    end
  end
end
