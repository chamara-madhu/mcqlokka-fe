import { Loader } from "feather-icons-react";

const PageLoader = () => {
  return (
    <div className="h-[70vh] flex items-center justify-center">
      <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
    </div>
  );
};

export default PageLoader;
