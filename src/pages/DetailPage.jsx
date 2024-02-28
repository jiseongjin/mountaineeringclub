import Comments from 'components/detail/Comments/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';

const DetailPage = () => {
  // useParams 이용하기
  const { id } = useParams();

  return (
    <>
      <HikingTrail mountainName={id} />
      <Comments mountainName={id} />
    </>
  );
};

export default DetailPage;
