class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :balance
end
