import axios from 'axios';
import React, { useEffect, useState } from 'react';
import mountain from '../assets/mountain.png';

function Img({ data }) {
  const [images, setImages] = useState([]);

  //   console.log('뭐가뜨지:', data.명산_이름);
  //   useEffect(() => {
  //     const fetchImages = async () => {
  //       try {
  //         const query = encodeURIComponent(data.명산_이름);
  //         const img = await axios.get(`https://openapi.naver.com/v1/search/image?query=${query}`, {
  //           headers: {
  //             'X-Naver-Client-Id': 'TuCPmCv8PAy8HGrCKYeY',
  //             'X-Naver-Client-Secret': 'TTIRT7urUy'
  //           }
  //         });
  //         // console.log('응답', data.ing);
  //         setImages(img.data.documents[0]);
  //       } catch (error) {
  //         console.error('불러오기 실패:', error);
  //       }
  //     };

  //     fetchImages();
  //   }, []);

  //   //   const [images, setImages] = useState([]);
  //   useEffect(() => {
  //     const fetchImages = async () => {
  //       try {
  //         const { data } = await axios.get(
  //           `http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice`,
  //           {
  //             params: {
  //               ServiceKey: 'NUgFWDjxiyffxm25yrpOKLNIiA2uCXZy7KPqn0sZB8GPoMUTLzf3MCxnKWwtmqDTqD9ouBXygZCDJKyHNpjTvg==',
  //               mntnnm: '가덕산'
  //             }
  //           }
  //         );
  //         console.log(data.mntnattchimageseq);
  //       } catch (error) {
  //         console.error('불러오기 실패:', error);
  //       }
  //     };

  //   fetchImages();
  // }, []);

  const REST_API_KEY = '4b5d15ef584fc69216b3bce213e701d9';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = encodeURIComponent(data.명산_이름);
        const img = await axios.get(`https://dapi.kakao.com/v2/search/image?query=${query}`, {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
          }
        });
        console.log('뭐가뜨지:', img);
        setImages(img.data.documents[0]);
      } catch (error) {
        console.error('불러오기 실패:', error);
      }
    };

    fetchImages();
  }, [REST_API_KEY]);

  return <div>{images.length === 0 ? <img src={mountain} /> : <img src={images.image_url} />}</div>;
}

export default Img;
