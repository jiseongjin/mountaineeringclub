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
        setImages(data.documents);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImages();
  }, [REST_API_KEY]);

  return (
    <div>
      {/* <div>{data.documents[0]}</div> */}
      <div>
        {images.map((data, img) => (
          <img key={img} src={data.thumbnail_url} />
        ))}
      </div>
    </div>
  );
};

export default Image;
