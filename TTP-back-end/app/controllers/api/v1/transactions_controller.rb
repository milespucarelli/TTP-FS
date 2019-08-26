class Api::V1::TransactionsController < ApplicationController
  def create
    Transaction.create(transaction_params)
    id = transaction_params[:user_id]
    user = User.find(id)
    current_balance = user.balance
    total_price = transaction_params[:price].to_f * transaction_params[:share].to_i
    remaining_balance = current_balance - total_price
    @user = User.update(id, balance: remaining_balance)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: 'failed to record transaction' }, status: :not_acceptable
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:price, :share, :ticker, :user_id)
  end
end
