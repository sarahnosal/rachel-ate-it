class BakedGoodsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]    

    def index
        render json: BakedGood.all
    end

    def show
        baked_good = BakedGood.find(params[:id])
        render json: baked_good
    end
end
