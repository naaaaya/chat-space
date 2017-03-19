require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) { create(:user) }
  let(:group) { user.groups.first}


  describe 'GET #index' do
    before do
      login_user user
    end

    it "assigns the requested contact to @groups" do
      @group = user.groups.first
      get :index, params: { group_id: @group.id }
      groups = user.groups
      expect(assigns(:groups)).to eq groups
    end
  end

  describe 'POST #create' do

    before do
      login_user user
    end

    context "when message is saved successfully" do
      it "saves the new message in the database" do
        expect{
          post :create, params: {group_id: group.id, message: attributes_for(:message)}
          }.to change(Message, :count).by(1)
        end

        it "redirects to message#index" do
          post :create, params: {group_id: group.id, message: attributes_for(:message)}
          expect(response).to redirect_to group_messages_path(group)
        end
      end

      context "when failed to save message" do
       it "doesn't save the new message in the DB" do
        expect{
          post :create, params: {group_id: group.id, message: attributes_for(:message, body: nil)}
          }.not_to change(Message, :count)
        end

        it 'renders :index' do
          post :create, params: {group_id: group.id, message: attributes_for(:message, body: nil)}

          expect(response).to render_template :index
        end
      end

    end
  end
