class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]    

    def index
        comments = Comment.all
        render json: comments
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment
    end

    def create
        comment =  @current_user.comments.create!(comment_params)
        render json: comment, status: :created 
    end

    def destroy
        comment = @current_user.comments.find(params[:id])
        comment.destroy
        head :no_content
    end

    def update
        review = Review.find_by(id: params[:id])
        review.update!(review_params)
        render json: review
    end

    private

    def comment_params
        params.require(:comment).permit(:comment, :user_id, :blog_id)
    end
end
