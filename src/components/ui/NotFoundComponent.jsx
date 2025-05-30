import { MdErrorOutline } from "react-icons/md";

const NotFoundComponent = ({ title = "Not Found" }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <MdErrorOutline className="text-red-600 text-5xl mb-4" />
      <h2 className="text-2xl font-semibold text-content-200">{title}</h2>
      <p className="text-content-400/80 mt-2">
        Please check the data or try again later.
      </p>
    </div>
  );
};

export default NotFoundComponent;
