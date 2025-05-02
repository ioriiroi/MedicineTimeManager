class Api::MedicinesController < ApplicationController
    before_action :set_medicine, only: %i[ show edit update destroy ]

    # GET /medicines or /medicines.json
    def index
      @medicines = Medicine.all
      render json: @medicines
    end
  
    # GET /medicines/1 or /medicines/1.json
    def show
      render json: @medicine
    end
  
    # GET /medicines/new
    def new
      @medicine = Medicine.new
    end
  
    # GET /medicines/1/edit
    def edit
    end
  
    # POST /medicines or /medicines.json
    def create
      @medicine = Medicine.new(medicine_params)
  
      if @medicine.save
        render json: @medicine, status: :ok
      else
        render json: @medicine.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /medicines/1 or /medicines/1.json
    def update
      if @medicine.update(medicine_params)
        render json: @medicine, status: :ok
      else
        render json: @medicine.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /medicines/1 or /medicines/1.json
    def destroy
      if @medicine.destroy
        render json: { message: "Medicine was successfully destroyed." }, status: :ok
      else
        render json: { error: "Failed to destroy medicine." }, status: :unprocessable_entity
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_medicine
        @medicine = Medicine.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def medicine_params
        params.require(:medicine).permit(:name, :hour, :minute, :second, :memo)
      end
  end
