class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :share, :price
end
