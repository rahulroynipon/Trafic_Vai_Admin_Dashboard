import useServiceStore from "../../store/serviceStore";
import Skeleton from "../ui/Skeleton";

function SubserviceList() {
  const { isLoading, subservices } = useServiceStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
      {isLoading.getSub ? (
        Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className="h-40 max-w-full rounded-lg space-y-1"
            />
          ))
      ) : subservices.length ? (
        subservices.map((subservice) => (
          <div
            key={subservice?._id}
            className="border border-primary rounded-lg p-5 space-y-1
              hover:bg-primary/10 transition-colors duration-300 cursor-pointer 
              focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
            title={subservice?.name}
          >
            <h2 className="font-semibold text-lg mb-2">{subservice?.name}</h2>
            <p>Total Order: {subservice?.totalOrder}</p>
            <p>Completed Orders: {subservice?.totalCompletedOrder}</p>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-content-400 mt-10">
          No subservices available.
        </p>
      )}
    </div>
  );
}

export default SubserviceList;
