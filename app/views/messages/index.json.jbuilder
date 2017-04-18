 json.messages do
  json.array!(@unloaded_messages) do |message|
    # json.partial! モデル変数 を使うと、
    # 部分テンプレートを表示する
    json.partial!(message)
  end
end

