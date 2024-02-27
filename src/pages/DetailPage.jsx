import Comments from 'components/detail/Comments/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmark from 'components/detail/Bookmark';
import CheckCompletion from 'components/detail/CheckCompletion';

const DetailPage = () => {
  const { postId } = useParams();

  return (
    <>
      <HikingTrail />
      <Bookmark postId={postId} />
      <CheckCompletion postId={postId} />
      <Comments postId={postId} />
    </>
  );
};

export default DetailPage;
