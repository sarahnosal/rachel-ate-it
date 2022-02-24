class BakedGoodsController < ApplicationController

    def index
        render json: BakedGood.all
    end
end
