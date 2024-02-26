
import Link from 'next/link';
import React from 'react';
import { IPriceTable, IService } from '../../_lib/types/types';
import ButtonRenderer from '../ButtonRenderer';

const PriceTable = (props: IPriceTable) => {
  const { service } = props;

  return (
    <section className="col-span-12 mt-16">
      {service.map((service: IService) => (
        <div key={service.name} className="">
          <Link href={service.slug.current}>
            <h2 className="text-xl">
              {service.name}
            </h2>
          </Link>
          {service.priceOptions.map((priceOption, index) => (
            <div key={index} className="mt-2 flex justify-between border-b border-accent">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-bold">
                    {priceOption.duration} {priceOption.unit}
                  </p>
                  {priceOption.description && <p>{priceOption.description}</p>}
                </div>
                <div className="my-2 flex items-center">
                  <p className="mr-4 font-bold ">{priceOption.price}€</p>
                  {priceOption.button && (
                    <ButtonRenderer button={priceOption.button} className='transition-scale' />
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
