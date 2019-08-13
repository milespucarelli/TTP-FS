class ApplicationController < ActionController::API
  before_action :authorized

  TOKEN_SECRET = '6@[)c7<eMZ{4+]#r'.freeze

  def encode_token(payload)
    JWT.encode(payload, TOKEN_SECRET)
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless auth_header

    token = auth_header.split(' ')[1]
    begin
      JWT.decode(token, TOKEN_SECRET, true, algorithm: 'HS256')
    rescue JWT::DecodeError
      nil
    end
  end

  def current_user
    return unless decoded_token

    user_id = decoded_token[0]['user_id']
    @user = User.find_by(id: user_id)
  end

  def logged_in?
    !!current_user
  end

  def authorized
    # Guard clause for being logged in already
    return unless logged_in?

    render json: { message: 'Please log in' }, status: :unauthorized
  end
end
