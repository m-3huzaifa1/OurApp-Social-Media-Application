const cloudinary=require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dgn8zvggj', 
    api_key: '598839279228471', 
    api_secret: 'gbkVLYintgC9_8bkiuDUEbR6_cM' 
  });

  module.exports = {cloudinary};