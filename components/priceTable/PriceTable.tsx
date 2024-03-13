import React, { useRef, useState } from "react";
import { IPriceTable, IService } from "../../_lib/types/types";
import ButtonRenderer from "../ButtonRenderer";
import CustomImage from "../CustomImage";

const PriceTable = (props: IPriceTable) => {
  const { service, location, additionalInfo, layout } = props;
  const [activeLocation, setActiveLocation] = useState("");
  const priceTableRef = useRef(null); // Create a ref for the price table section


  const locations = ["Lielahti", "Pirkkala", "Tampere"];
  const isAllLocations = location === "All";

  // Filter services to include those that have priceOptions for the current location
  const filteredServices = service.filter((s) =>
    s.priceOptions.some((price) =>
      isAllLocations
        ? price.location === activeLocation
        : price.location === location
    )
  );

  const handleLocationClick = (loc: string) => {
    setActiveLocation(loc);
    // Check if the priceTableRef.current is not null and scroll into view
    if (priceTableRef.current) {
      priceTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  switch (layout) {
    case "default-table":
      return (
        <section className="col-span-12 mt-8 sm:mt-16">
          <div className="border border-accent rounded-app shadow-app p-4">
            {isAllLocations && (
              <div className="flex justify-center mb-4">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    className={`px-4 py-2 ${
                      activeLocation === loc ? "button" : "bg-transparent"
                    }`}
                    onClick={() => setActiveLocation(loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
            <h2 className="flex justify-center text-2xl">
              {isAllLocations ? activeLocation : location}
            </h2>
            {additionalInfo && (
              <p className="flex justify-center text-center max-w-4xl mx-auto">
                {additionalInfo}
              </p>
            )}
            {filteredServices.map((service: IService) => (
              <div key={service.name} className="border-b pt-8 border-accent">
                <h2 className="text-xl">{service.name}</h2>
                {service.priceOptions
                  .filter((price) =>
                    isAllLocations
                      ? price.location === activeLocation
                      : price.location === location
                  )
                  .map((price, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex w-full justify-between mt-2">
                        <div>
                          <p className="font-bold">
                            {price.duration} {price.unit}
                          </p>
                          {price.description && <p>{price.description}</p>}
                        </div>
                        <div className="flex items-start">
                          <p className="font-bold">{price.price}€</p>
                          {price.button && (
                            <ButtonRenderer
                              button={price.button}
                              className="ml-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>
      );
    case "no-price":
      return (
        <>
         <section className="col-span-12 mt-8 sm:mt-16">
      <section
        key={service[0]._key}
        className="col-span-12 overflow-hidden relative py-8 md:py-12 rounded-app bg-accent text-bg"
      >
        <div className="z-10 relative mx-auto max-w-5xl text-center px-4 md:px-0">
          <p>
            Varaa aika äitiysfysioterapiaan, äitiyshierontaan tai fysioterapiaan Tampereen keskustaan, Lielahteen tai Pirkkalaan. Tavoitat minut myös sähköpostilla tai puhelimitse.
          </p>
          {isAllLocations && (
            <div className="flex justify-center mt-4 gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  className={`px-4 py-2 ${activeLocation === loc ? "button border-bg border" : "button2 text-text"}`}
                  onClick={() => handleLocationClick(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
    <section ref={priceTableRef} className="col-span-12 mt-8 sm:mt-16">
      {activeLocation && filteredServices.map((service: IService) => (
        <div key={service.name} className="mt-4">
          <h2 className="text-xl">{service.name}</h2>
          {service.priceOptions.filter((price) => price.location === activeLocation).map((price, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-center w-full justify-between border-b border-accent pt-2 pb-1">
                <div>
                  {price.description && (
                    <span>{price.description} - </span>
                  )}
                  <span>{price.duration} {price.unit}</span>
                </div>
                <div className="flex items-center">
                  <p>{price.price}€</p>
                  {price.button && (
                    <ButtonRenderer
                      button={price.button}
                      className="ml-2 py-1"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
        </>
      );
    default:
      return <></>;
  }
};

export default PriceTable;
