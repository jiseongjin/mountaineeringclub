import Comments from 'components/detail/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmarked from 'components/detail/Bookmarked';
import Completed from 'components/detail/Completed';

const DetailPage = () => {
  const id = useParams().id;

  return (
    <>
      <Bookmarked postId={id} />
      <Completed postId={id} />
      <Comments />
    </>
  );
};

export default DetailPage;
