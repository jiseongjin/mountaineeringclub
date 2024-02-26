import Comments from 'components/detail/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmarked from 'components/detail/Bookmarked';
import Checked from 'components/detail/Checked';

const DetailPage = () => {
  const { postId } = useParams();

  return (
    <>
      <Bookmarked postId={postId} />
      <Checked postId={postId} />
      <Comments postId={postId} />
    </>
  );
};

export default DetailPage;
