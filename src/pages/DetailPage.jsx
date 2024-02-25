import Comments from 'components/detail/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmarked from 'components/detail/Bookmarked';

const DetailPage = () => {
  const id = useParams().id;

  return (
    <>
      <Bookmarked postId={id} />
      <Comments />
    </>
  );
};

export default DetailPage;
