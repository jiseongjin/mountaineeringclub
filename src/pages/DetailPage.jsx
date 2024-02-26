import Comments from 'components/detail/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';
import Bookmarked from 'components/detail/Bookmarked';
import Checked from 'components/detail/Checked';

const DetailPage = () => {
  const id = useParams().id;

  return (
    <>
      <Bookmarked postId={id} />
      <Checked postId={id} />
      <Comments postId={id} />
    </>
  );
};

export default DetailPage;
