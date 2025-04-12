require "application_system_test_case"

class MedicineListsTest < ApplicationSystemTestCase
  setup do
    @medicine_list = medicine_lists(:one)
  end

  test "visiting the index" do
    visit medicine_lists_url
    assert_selector "h1", text: "Medicine lists"
  end

  test "should create medicine list" do
    visit medicine_lists_url
    click_on "New medicine list"

    fill_in "Interval", with: @medicine_list.interval
    fill_in "Medicinename", with: @medicine_list.medicineName
    fill_in "Memo", with: @medicine_list.memo
    click_on "Create Medicine list"

    assert_text "Medicine list was successfully created"
    click_on "Back"
  end

  test "should update Medicine list" do
    visit medicine_list_url(@medicine_list)
    click_on "Edit this medicine list", match: :first

    fill_in "Interval", with: @medicine_list.interval.to_s
    fill_in "Medicinename", with: @medicine_list.medicineName
    fill_in "Memo", with: @medicine_list.memo
    click_on "Update Medicine list"

    assert_text "Medicine list was successfully updated"
    click_on "Back"
  end

  test "should destroy Medicine list" do
    visit medicine_list_url(@medicine_list)
    click_on "Destroy this medicine list", match: :first

    assert_text "Medicine list was successfully destroyed"
  end
end
