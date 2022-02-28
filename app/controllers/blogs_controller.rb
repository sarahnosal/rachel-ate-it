class BlogsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]    

    def index
        render json: Blog.all
    end

    def show
        blog = Blog.find(params[:id])
        render json: blog
    end
end
    