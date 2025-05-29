import useServiceStore from "../../store/serviceStore";
import { Link } from "react-router";
import Skeleton from "../ui/Skeleton";

function ServiceList() {
  const { services, isLoading } = useServiceStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
      {isLoading.get
        ? Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-60 max-w-full rounded-lg" />
            ))
        : services.map((service) => (
            <Link
              key={service?._id}
              to={`/services/${service?.slug}`}
              className="border border-primary rounded-lg p-5 flex flex-col items-center gap-5 
                hover:bg-primary/10 transition-colors duration-300 cursor-pointer 
                focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
            >
              <div className="w-20 h-20">
                <img
                  src={service?.icon?.url}
                  alt={`${service?.slug || "service"}-icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center space-y-1">
                <h2 className="font-semibold text-lg mb-2">{service?.name}</h2>
                <p>Service: {service?.totalSubService} Category</p>
                <p>Total Order: {service?.totalOrder}</p>
                <p>Completed Order: {service?.totalCompletedOrder}</p>
              </div>
            </Link>
          ))}
    </div>
  );
}

export default ServiceList;
