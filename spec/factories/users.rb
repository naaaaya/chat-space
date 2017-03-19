FactoryGirl.define do
  pass = Faker::Internet.password(8)

  factory :user do
    name                   Faker::Name.name
    email                  Faker::Internet.email
    password               pass
    password_confirmation  pass

    after(:create) do |user|
       temp_group = create(:group)
      # ここでgroupをcreateしてtemp_groupに入れる
      create(:users_group, user: user, group: temp_group)

    end
  end
end