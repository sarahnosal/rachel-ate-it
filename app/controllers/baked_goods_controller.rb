class BakedGoodsController < ApplicationController

    def index
        render json: BakedGood.all
    end

    def show
        baked_good = BakedGood.find(params[:id])
        render json: baked_good
    end
end
