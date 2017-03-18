require 'rails_helper'

describe User do
  describe '#create' do
    it 'is invalid without a email' do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'is valid with a email' do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid with a duplicate email address" do
      #はじめにユーザーを登録
      user = create(:user)
    #先に登録したユーザーと同じemailの値を持つユーザーのインスタンスを作成
    another_user = build(:user, email: user.email)
    another_user.valid?
    expect(another_user.errors[:email]).to include("has already been taken")
  end

  it 'is invalid without a password' do
    user = build(:user, password:nil)
    user.valid?
    expect(user.errors[:password]).to include("can't be blank")
  end

  it 'is invalid without a confimation password although with a password' do
    user = build(:user, password_confirmation:nil)
    user.valid?
    expect(user.errors[:password_confirmation]).to include("can't be blank")
  end

    it "is invalid with a password that has less than 8 characters " do
      user = build(:user, password: "0000000", password_confirmation: "0000000")
      user.valid?
      expect(user.errors[:password][0]).to include("is too short")
    end


  it 'is valid with a password that has more than 8 characters' do
    user = build(:user, password:'0000000000',password_confirmation:'0000000000')
    expect(user).to be_valid
  end



end
end
