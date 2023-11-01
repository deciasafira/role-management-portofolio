import { FaAngleRight } from 'react-icons/fa';

const Headline = ({
  title,
  showMap,
  setShowMap,
}) => {

  const goToMap = () => {
    setShowMap(true);
  }

  return (
    <div className="flex justify-between py-10 items-center">
      <h1 className="text-4xl font-bold tracking-wide">{title}</h1>
      <button className="flex items-center space-x-1 hover:text-light-primary" onClick={goToMap}>
        <h1 className="font-medium text-lg ">Back to main Map</h1>
        <FaAngleRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Headline;
