FactoryGirl.define do

  factory :message do
    body  Faker::Lorem.word
  end

end