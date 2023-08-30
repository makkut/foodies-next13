import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
  return (
    <div className="flex justify-center pt-5">
      <BeatLoader color="red" size={25} />
    </div>
  );
};

export default Spinner;
