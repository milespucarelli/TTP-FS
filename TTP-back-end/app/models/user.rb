class User < ApplicationRecord
  has_many :transactions
  validates :email, uniqueness: { case_sensitive: false }
  has_secure_password
end
