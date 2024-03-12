import React, { useState } from 'react';
import { IPriceTable, IService } from '../../_lib/types/types';
import ButtonRenderer from '../ButtonRenderer';
import CustomImage from '../CustomImage';

const PriceTable = (props: IPriceTable) => {
  const { service, location, additionalInfo, layout } = props;
  const [activeLocation, setActiveLocation] = useState('Lielahti');

  const locations = ['Lielahti', 'Pirkkala', 'Tampere'];
  const isAllLocations = location === 'All';

  // Filter services to include those that have priceOptions for the current location
  const filteredServices = service.filter(s => 
    s.priceOptions.some(price => isAllLocations ? price.location === activeLocation : price.location === location)
  );

  switch (layout) {
    case 'default-table':
  return (
    <section className="col-span-12 mt-8 sm:mt-16">
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
  case 'cards':
  return (
    <section className="col-span-12 mt-8 sm:mt-16">
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
     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {filteredServices.map((service: IService) => (
    <div key={service.name} className="border border-accent rounded-app shadow-app flex flex-col">
      <CustomImage {...service.metadata.image} width={500} className="w-full h-48 rounded-t-app object-cover" alt={service.metadata.image.alt} />
      <div className="flex-1 p-4 flex flex-col justify-between">
        <h2 className="text-xl mb-4">{service.name}</h2>
        <div>
          {service.priceOptions
            .filter(price => isAllLocations ? price.location === activeLocation : price.location === location)
            .map((price, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      {price.duration} {price.unit}
                    </p>
                    {price.description && <p className="text-sm">{price.description}</p>}
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
      </div>
    </div>
  ))}
</div>

    </section>
  );

  case 'no-buttons':
    return (
      <section className="col-span-12 mt-8 sm:mt-16">
        <div className="border border-accent rounded-app shadow-app p-4">
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
                    <div>
                      <p className="font-bold">
                        {price.duration} {price.unit}
                      </p>
                      {price.description && <p>{price.description}</p>}
                    </div>
                    <div className="flex items-start">
                      <p className="font-bold">{price.price}€</p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </section>
    );
  case 'no-price':
    return (
      <section className="col-span-12 mt-8 sm:mt-16">
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
    default:
      return <></>;
  }
};

export default PriceTable;
