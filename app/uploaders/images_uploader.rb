class ImagesUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick
   if Rails.env.development?
    storage :fog
  elsif Rails.env.production?
    storage :fog
  else
    storage :file
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  process :resize_to_limit => [700, 700]
  process :convert => 'jpg'

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def filename
    time = Time.now
    if model.image.url
      name = time.strftime('%Y%m%d%H%M%S') + '.jpg'
      name.downcase
    end
  end

end
