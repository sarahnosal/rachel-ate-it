class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def index
        user = User.find_by(id: session[:user_id])
        if user
            render json: user.reviews
        else
            render json: {errors: ['No user logged in']}, status: 401
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        review = Review.find_by(id: params[:id])
        if user
            render json: review
        else
            render json: {errors: ['No user logged in']}, status: 401
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user && params[:baked_good_id]
            review = user.reviews.create!(review_params)
            render json: review, status: :created
        else
            render json: {errors: ['No user logged in']}, status: 401
        end
    end

    def update
        review = Review.find_by(id: params[:id])
        review.update!(review_params)
        render json: review
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:score, :comment, :user_id, :baked_good_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
