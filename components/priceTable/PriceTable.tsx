import React, { useCallback, useEffect, useRef, useState } from "react";
import { IPriceTable } from "../../_lib/types/types";
import ButtonRenderer from "../ButtonRenderer";
import useFadeIn from "../../_lib/hooks/useFadeIn";

const PriceTable = (props: IPriceTable) => {
  const { service, location, layout, description, title } = props;

  const fadeInRef = useFadeIn();


  // Set initially active location based on layout type
  const [activeLocation, setActiveLocation] = useState(layout === "default-table" ? location[0] : null);
  const priceTableRef = useRef<HTMLDivElement | null>(null);

  const filteredServices = activeLocation
    ? service.filter((s) =>
        s.priceOptions.some((price) => price.location.city === activeLocation.city)
      )
    : [];

  useEffect(() => {
    if (activeLocation && priceTableRef.current) {
      const offset = 150;
      const elementPosition = priceTableRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [activeLocation]);

  const handleLocationClick = (loc) => {
    setActiveLocation(loc);
  };

  const mergedRef = useCallback(node => {
    // Assign to priceTableRef
    priceTableRef.current = node;
  
    // Assign to fadeInRef if it's a function (common pattern for custom hooks)
    if (typeof fadeInRef === 'function') {
      (fadeInRef as React.MutableRefObject<HTMLElement>).current = node;
    } else if (fadeInRef) {
      // Assign to fadeInRef if it's an object with a current property
      fadeInRef.current = node;
    }
  }, [fadeInRef]);

switch (layout) {
  case "default-table":
    return (
<section ref={mergedRef} className="col-span-12 mt-8 sm:mt-16">
          <div className="text-center">
            {layout === "default-table" && (
              <>
                <div className="flex justify-center gap-2">
                  {location.map((loc, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 ${activeLocation && activeLocation.city === loc.city ? "button border-bg border" : "button2 text-text"}`}
                      onClick={() => handleLocationClick(loc)}
                    >
                      {loc.title}
                    </button>
                  ))}
                </div>
                <h3 className="text-2xl mt-4">{activeLocation.city}</h3>
                <span>{activeLocation.place} - </span>
                <span>{activeLocation.address}</span>
              </>
            )}
          </div>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.name} className="mt-4">
                <h2 className="text-xl">{service.name}</h2>
                {service.priceOptions
                  .filter((price) => price.location.city === activeLocation.city)
                  .map((price, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-center w-full justify-between border-b border-accent pt-2 pb-1">
                        <div>
                          {price.description && <span>{price.description} - </span>}
                          <span>{price.duration} {price.unit}</span>
                        </div>
                        <div className="flex items-center">
                          <p>{price.price}€</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p className="text-center py-4">No services available for this location.</p>
          )}
        </section>
    );
    case "dropdown-banner":
    return (
      <>
        <section className="col-span-12 mt-8 sm:mt-16" ref={mergedRef}>
          <section className="col-span-12 overflow-hidden relative py-8 rounded-app bg-accent text-bg">
            <div className="z-10 relative mx-auto max-w-5xl text-center px-4 md:px-0">
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
              <div className="flex justify-center mt-4 gap-2">
                {location.map((loc, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 ${activeLocation && activeLocation.city === loc.city ? "button border-bg border" : "button2 text-text"}`}
                    onClick={() => handleLocationClick(loc)}
                  >
                    {loc.title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </section>
        {activeLocation && (
          <section ref={priceTableRef} className="col-span-12">
            <div className="text-center mt-4">
            <h3 className="text-2xl">{activeLocation.city} </h3>
            <span>{activeLocation.place} - </span>
            <span>{activeLocation.address}</span>
            </div>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service.name} className="mt-4">
                  <h2 className="text-xl">{service.name}</h2>
                  {service.priceOptions
                    .filter((price) => price.location.city === activeLocation.city)
                    .map((price, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="flex items-center w-full justify-between border-b border-accent pt-2 pb-1">
                          <div>
                            {price.description && <span>{price.description} - </span>}
                            <span>{price.duration} {price.unit}</span>
                          </div>
                          <div className="flex items-center">
                            <p>{price.price}€</p>
                            {price.button && <ButtonRenderer button={price.button} className="ml-2 py-1"/>}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <p className="text-center py-4">No services available for this location.</p>
            )}
          </section>
        )}
      </>
    );
  default:
    return <></>;
  }
};

export default PriceTable;
