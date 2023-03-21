require "test_helper"

class Imge2ExcelControllerTest < ActionDispatch::IntegrationTest
  test "should get post" do
    get imge2_excel_post_url
    assert_response :success
  end
end
