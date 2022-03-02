class ReviewsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]    

    def index
        reviews = Review.all
        render json: reviews
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        review =  @current_user.reviews.create!(review_params)
        render json: review, status: :created 
    end

    def destroy
        review = @current_user.reviews.find(params[:id])
        review.destroy
        head :no_content
    end

    # def update
    #     review = Review.find_by(id: params[:id])
    #     review.update!(review_params)
    #     render json: review
    # end

    private

    def review_params
        params.require(:review).permit(:score, :comment, :user_id, :baked_good_id)
    end
    
end