import React, { useState } from 'react';
import { IPriceTable, IService } from '../../_lib/types/types';
import ButtonRenderer from '../ButtonRenderer';

const PriceTable = (props: IPriceTable) => {
  const { service, location, additionalInfo } = props;
  const [activeLocation, setActiveLocation] = useState('Lielahti');

  const locations = ['Lielahti', 'Pirkkala', 'Tampere'];
  const isAllLocations = location === 'All';

  // Filter services to include those that have priceOptions for the current location
  const filteredServices = service.filter(s => 
    s.priceOptions.some(price => isAllLocations ? price.location === activeLocation : price.location === location)
  );

  return (
    <section className="col-span-12 mt-16">
      <div className='border border-accent rounded-app shadow-app p-4'>
        {isAllLocations && (
          <div className="flex justify-center mb-4">
            {locations.map(loc => (
              <button
                key={loc}
                className={`px-4 py-2 ${activeLocation === loc ? 'button' : 'bg-transparent'}`}
                onClick={() => setActiveLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        )}
        <h2 className='flex justify-center text-2xl'>{isAllLocations ? activeLocation : location}</h2>
        {additionalInfo && (
          <p className='flex justify-center text-center max-w-4xl mx-auto'>{additionalInfo}</p>
        )}
        {filteredServices.map((service: IService) => (
          <div key={service.name} className="border-b pt-8 border-accent">
            <h2 className="text-xl">
              {service.name}
            </h2>
            {service.priceOptions
              .filter(price => isAllLocations ? price.location === activeLocation : price.location === location)
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
                        <ButtonRenderer button={price.button} className='ml-2'/>
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
};

export default PriceTable;
