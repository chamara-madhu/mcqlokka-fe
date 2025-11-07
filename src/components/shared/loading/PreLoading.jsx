import { ClipLoader } from "react-spinners";

const PreLoading = () => {
  return (
    <div className="w-full h-[500px] flex justify-center items-center">
      <ClipLoader
        color={"#6941C6"}
        loading={true}
        size={32}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default PreLoading;
