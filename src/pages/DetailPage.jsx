import Comments from 'components/detail/Comments/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmark from 'components/detail/Bookmark';
import CheckCompletion from 'components/detail/CheckCompletion';

const DetailPage = () => {
  // useParams 이용하기
  const { id } = useParams();

  return (
    <>
      <HikingTrail mountainName={id} />
      {/* <Bookmark mountainName={id} />
      <CheckCompletion mountainName={id} /> */}
      <Comments mountainName={id} />
    </>
  );
};

export default DetailPage;
