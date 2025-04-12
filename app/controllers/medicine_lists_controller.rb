class MedicineListsController < ApplicationController
  before_action :set_medicine_list, only: %i[ show edit update destroy ]

  # GET /medicine_lists or /medicine_lists.json
  def index
    @medicine_lists = MedicineList.all
  end

  # GET /medicine_lists/1 or /medicine_lists/1.json
  def show
  end

  # GET /medicine_lists/new
  def new
    @medicine_list = MedicineList.new
  end

  # GET /medicine_lists/1/edit
  def edit
  end

  # POST /medicine_lists or /medicine_lists.json
  def create
    @medicine_list = MedicineList.new(medicine_list_params)

    respond_to do |format|
      if @medicine_list.save
        format.html { redirect_to @medicine_list, notice: "Medicine list was successfully created." }
        format.json { render :show, status: :created, location: @medicine_list }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @medicine_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /medicine_lists/1 or /medicine_lists/1.json
  def update
    respond_to do |format|
      if @medicine_list.update(medicine_list_params)
        format.html { redirect_to @medicine_list, notice: "Medicine list was successfully updated." }
        format.json { render :show, status: :ok, location: @medicine_list }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @medicine_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /medicine_lists/1 or /medicine_lists/1.json
  def destroy
    @medicine_list.destroy!

    respond_to do |format|
      format.html { redirect_to medicine_lists_path, status: :see_other, notice: "Medicine list was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  # 次までの時間の更新
  def update_timestamp
    @medicine_list = MedicineList.find(params[:id])
    if @medicine_list.touch # updated_at を現在時刻に更新
      redirect_to medicine_lists_path, notice: "次までの時間を更新しました"
    else
      redirect_to medicine_lists_path, alert: "時間の更新に失敗しました"
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medicine_list
      @medicine_list = MedicineList.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def medicine_list_params
      params.expect(medicine_list: [ :medicineName, :interval, :memo ])
    end
end
