require 'rails_helper'
describe Message do
  describe '#create' do

    it  'is invalid without a message body' do
      message = build(:message, body: nil)
      message.valid?
      expect(message.errors[:body]).to include("can't be blank")
    end

    it 'is valid with a message body' do
      message = build(:message)
      expect(message).to be_valid
    end
    
    end
end