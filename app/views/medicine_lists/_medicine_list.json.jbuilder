json.extract! medicine_list, :id, :medicineName, :interval, :memo, :created_at, :updated_at
json.url medicine_list_url(medicine_list, format: :json)
