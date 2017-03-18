require 'rails_helper'

describe Group do
    it 'is invalid without a name' do
      group = build(:group, name: nil)
      group.valid?
      expect(group.errors[:name]).to include("can't be blank")
    end

    it 'is valid with a name' do
      group = build(:group)
      expect(group).to be_valid
    end
end