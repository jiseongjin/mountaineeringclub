import Comments from 'components/detail/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmark from 'components/detail/Bookmark';
import CheckCompletion from 'components/detail/CheckCompletion';

const DetailPage = () => {
  const { Id } = useParams();

  return (
    <>
      <HikingTrail />
      <Bookmark postId={Id} />
      <CheckCompletion postId={Id} />
      <Comments postId={Id} />
    </>
  );
};

export default DetailPage;
