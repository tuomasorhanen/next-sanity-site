
import Link from 'next/link';
import React from 'react';
import { IPriceTable, IService } from '../../_lib/types/types';
import ButtonRenderer from '../ButtonRenderer';

const PriceTable = (props: IPriceTable) => {
  const { service } = props;

  return (
    <section className="mx-auto mt-8 max-w-7xl">
      {service.map((service: IService) => (
        <div key={service.name} className="mt-4 px-4 py-2">
          <Link href={service.slug.current}>
            <button className="text-xl text-left transition-transform duration-300 ease-in-out hover:scale-105">
              {service.name}
            </button>
          </Link>
          {service.priceOptions.map((priceOption, index) => (
            <div key={index} className="mt-2 flex justify-between border-b border-accent">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-bold">
                    {priceOption.duration} {priceOption.unit}
                  </p>
                  <p>{priceOption.description}</p>
                </div>
                <div className="my-2 flex items-center">
                  <p className="mr-4 font-bold">{priceOption.price}€</p>
                  {priceOption.button && (
                    <ButtonRenderer button={priceOption.button} className='w-8 hover:scale-125 transition-transform ease-in-out duration-300' />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default PriceTable;
