// 등산로 관련이 나오나 배열이 나오는것도 있고 객체가 나오는것도 있음

// const fetchData = async () => {
//     try {
//       const { data } = await axios.get(
//         'http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice',
//         {
//           params: {
//             ServiceKey: '0wHFN3EE7v+jLjujPukh2tGtJj/yCRpvhr5reMlXtjDkWobuC62OIZ+c9fLJ3VbRN3ocF9r3hWOj3r/LaWtf3w==',
//             mntnNm: '용마산'
//           }
//         }
//       );
//       setMountainData(data.response.body.items);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//등산로 api
// cors 에러 있음 chrome 확장프로그램(CORS Unblock) 이용.
// 정확한 등산로 데이터가 안나옴!!
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://apis.vworld.kr/2ddata/frstclimb/data', {
//           params: {
//             apiKey: 'C52BF50F-4E62-3A15-B415-2D05A786EA03',
//             domain: 'http://localhost:3000',
//             emdCd: '41281107',
//             output: 'json',
//             srsName: 'EPSG:4326',
//             id: 'LT_L_FRSTCLIMB.61379'
//           }
//         });
//         // setData(data.featureCollection.features);
//         console.log(response);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//     fetchData();
//   }, []);

// 산 코드 가져오기
// const fetchData = async () => {
//     try {
//       const { data } = await axios.get(
//         'https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoOpenAPI2',
//         {
//           params: {
//             ServiceKey: '0wHFN3EE7v+jLjujPukh2tGtJj/yCRpvhr5reMlXtjDkWobuC62OIZ+c9fLJ3VbRN3ocF9r3hWOj3r/LaWtf3w==',
//             searchWrd: params
//           }
//         }
//       );
//       const mountainDatas = data.response.body.items.item;

// 산 이미지 가져오기
// const mountainImgs = await axios.get(
//     'https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2',
//     {
//       params: {
//         mntiListNo: mountainDatas.mntilistno,
//         ServiceKey: '0wHFN3EE7v+jLjujPukh2tGtJj/yCRpvhr5reMlXtjDkWobuC62OIZ+c9fLJ3VbRN3ocF9r3hWOj3r/LaWtf3w==',
//         numOfRows: '1'
//       }
//     }
//   );
//   console.log(mountainImgs);
