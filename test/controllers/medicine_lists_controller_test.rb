require "test_helper"

class MedicineListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @medicine_list = medicine_lists(:one)
  end

  test "should get index" do
    get medicine_lists_url
    assert_response :success
  end

  test "should get new" do
    get new_medicine_list_url
    assert_response :success
  end

  test "should create medicine_list" do
    assert_difference("MedicineList.count") do
      post medicine_lists_url, params: { medicine_list: { interval: @medicine_list.interval, medicineName: @medicine_list.medicineName, memo: @medicine_list.memo } }
    end

    assert_redirected_to medicine_list_url(MedicineList.last)
  end

  test "should show medicine_list" do
    get medicine_list_url(@medicine_list)
    assert_response :success
  end

  test "should get edit" do
    get edit_medicine_list_url(@medicine_list)
    assert_response :success
  end

  test "should update medicine_list" do
    patch medicine_list_url(@medicine_list), params: { medicine_list: { interval: @medicine_list.interval, medicineName: @medicine_list.medicineName, memo: @medicine_list.memo } }
    assert_redirected_to medicine_list_url(@medicine_list)
  end

  test "should destroy medicine_list" do
    assert_difference("MedicineList.count", -1) do
      delete medicine_list_url(@medicine_list)
    end

    assert_redirected_to medicine_lists_url
  end
end
