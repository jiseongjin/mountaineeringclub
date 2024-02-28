import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Image = () => {
  const [images, setImages] = useState([]);
  const REST_API_KEY = '4b5d15ef584fc69216b3bce213e701d9';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = encodeURIComponent('가리산');
        const { data } = await axios.get(`https://dapi.kakao.com/v2/search/image?query=${query}`, {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
          }
        });
        // console.log(data.documents[0]);
        if (data.documents.length > 0) {
          setImages(data.documents[0].thumbnail_url);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImages();
  }, [REST_API_KEY]);

  return (
    <div>
      {/* <div>{data.documents[0]}</div> */}
      <div>{images && <img src={images} />}</div>
    </div>
  );
};

export default Image;
