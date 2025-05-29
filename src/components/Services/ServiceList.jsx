import useServiceStore from "../../store/serviceStore";
import { useNavigate } from "react-router";

function ServiceList() {
  const { services } = useServiceStore();

  const navigate = useNavigate();

  const goToSubservice = (slug) => {
    navigate(slug);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
      {services.map((service) => (
        <div
          key={service?._id}
          onClick={() => goToSubservice(service?.slug)}
          className="border border-primary rounded-lg p-5 flex flex-col items-center 
          gap-5 hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
        >
          <div>
            <img src={service?.icon?.url} alt={`${service?.slug}-icon`} />
          </div>
          <div className="text-center">
            <h2 className="font-semibold text-lg mb-1.5">{service?.name}</h2>
            <p>Service : {service?.totalSubService} Category</p>
            <p>Total Order : {service?.totalOrder}</p>
            <p>Total complete order : {service?.totalCompletedOrder}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
