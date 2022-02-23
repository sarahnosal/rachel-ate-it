class BlogsController < ApplicationController
    skip_before_action :authorize

    def index
        render json: Blog.all
    end
end
    