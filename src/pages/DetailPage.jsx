import Comments from 'components/Comments';
import { useParams } from 'react-router-dom/dist';

const DetailPage = () => {
  const id = useParams().id;

  return (
    <>
      <Comments />
    </>
  );
};

export default DetailPage;
