import Comments from 'components/detail/Comments';
import { useParams } from 'react-router-dom/dist';
import HikingTrail from 'components/detail/HikingTrail';

const DetailPage = () => {
  const id = useParams().id;

  return (
    <>
      <HikingTrail />
      <Comments />
    </>
  );
};

export default DetailPage;
