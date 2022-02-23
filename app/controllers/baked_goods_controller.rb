class BakedGoodsController < ApplicationController
    skip_before_action :authorize

    def index
        render json: BakedGood.all
    end
end
