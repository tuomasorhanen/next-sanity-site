import { groq } from 'next-sanity';
import { client } from '../client/client';
import { IPage } from '../types/types';

//This is used by the ContentService to resolve any nested references before passing data to the page.

const fetchReference = async (refId: string, query: string) => {
  if (!refId) return null;
  return client.fetch(query, { refId });
};

const resolveReferences = async (page: IPage) => {
  const { content } = page;

  if (!Array.isArray(content)) {
    page.content = [];
    return page;
  }

  const resolvedContent = await Promise.all(
    content.map(async (item: any) => {
      switch (item._type) {
        case 'faqList':
          if (Array.isArray(item.faqList)) {
            item.faqList = await Promise.all(
              item.faqList.map(async (faq: any) => {
                return faq._ref
                  ? await fetchReference(faq._ref, groq`*[_id == $refId]{_id, _type, question, answer}[0]`)
                  : faq;
              })
            );
          }
          break;

          case 'priceTable':
            if (Array.isArray(item.service)) {
              item.service = await Promise.all(
                item.service.map(async (service: any) => {
                  return service._ref ? await fetchReference(service._ref, groq`*[_id == $refId][0]{
                    ...,
                    priceOptions[]{
                      ...,
                      location->{
                        ...
                      }
                    }
                  }`) : service;
                })
              );
            }
          
            if (Array.isArray(item.location)) {
              item.location = await Promise.all(
                item.location.map(async (location: any) => {
                  return location._ref ? await fetchReference(location._ref, groq`*[_id == $refId][0]`) : location;
                })
              );
            }
            break;
          
        case 'grid':
          if (Array.isArray(item.items)) {
            item.items = await Promise.all(
              item.items.map(async (gridItem: any) => {
                const { _ref, _type } = gridItem;
                if (_type === 'post' || _type === 'offers' || _type === 'groups' && _ref) {
                  return fetchReference(_ref, groq`*[_id == $refId][0]`);
                }
                return gridItem;
              })
            );
          }
          break;
      }

      return item;
    })
  );

  page.content = resolvedContent;
  return page;
};

export default resolveReferences;
