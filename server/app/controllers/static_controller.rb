class StaticController < ApplicationController
  def index
    serve_static_file(request.path)
  end

  private

  def serve_static_file(path)
    # public/ ディレクトリ内にファイルが存在する場合はそのファイルを返す
    if File.exist?(Rails.public_path + path)
      render file: Rails.public_path + path, layout: false, content_type: 'text/html'
    else
      render file: Rails.public_path + '404.html', status: :not_found, layout: false, content_type: 'text/html'
    end
  end
end
