
import Link from 'next/link';
import React from 'react';
import { IPriceTable, IService } from '../../_lib/types/types';
import ButtonRenderer from '../ButtonRenderer';

const PriceTable = (props: IPriceTable) => {
  const { service } = props;

  return (
    <section className="col-span-12 mt-16">
      {service.map((service: IService) => (
        <div key={service.name} className="border-b-2 pt-8  border-accent">
          <Link href={service.slug.current}>
            <h2 className="text-xl font-bold">
              {service.name}
            </h2>
          </Link>
          {service.priceOptions.map((price, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex w-full justify-between mt-2">
                <div>
                  <p className="font-bold">
                    {price.duration} {price.unit}
                  </p>
                  {price.description && <p>{price.description}</p>}
                </div>
                <div className="flex items-center">
                  <p className="font-bold ">{price.price}€</p>
                  {price.button && (
                      <ButtonRenderer button={price.button} className='py-1 px-2 ml-2'/>
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
