import { groq } from 'next-sanity';
import { client } from '../client/client';

const fetchData = async (query) => {
  return await client.fetch(query);
};
const resolveUrl = (navResult) => {
  if (!navResult || !navResult.slug || !navResult.slug.current) return '';
  let basePath = '';
  switch (navResult._type) {
    case 'page':
    case 'service':
      basePath = '';
      break;
    case 'post':
      basePath = 'blogi/';
      break;
    case 'groups':
      basePath = 'pienryhmat/';
      break;
    case 'offers':
      basePath = 'tarjoukset/';
      break;
  }
  return `${basePath}${navResult.slug.current}`;
};

const processButtons = async (content) => {
  if (content.buttons) {

    const buttonFetchPromises = content.buttons.map(async (button) => {
      return processButton(button);
    });

    content.buttons = await Promise.all(buttonFetchPromises);
  } else if (content.button && content.button._type === 'reference') {

    content.button = await processButton(content.button);
  }
  return content;
};
const processButton = async (button) => {
  if (button._type === 'reference') {
    const ctaQuery = groq`*[_id == '${button._ref}'][0]{
      _id,
      callToAction,
      linkType,
      navigateToUrl,
      image,
      style,
      navigateToPage->{slug{current}}
    }`;
    const ctaResult = await fetchData(ctaQuery);
    const { callToAction, navigateToUrl, image } = ctaResult;

    const navQuery = groq`*[_id == '${button._ref}']{navigateToPage->}[0].navigateToPage`;
    const navResult = await fetchData(navQuery);

    return {
      ...button,
      callToAction,
      style: ctaResult.style,
      navigateToPage: resolveUrl(navResult),
      linkType: navigateToUrl ? 'external' : 'internal',
      navigateToUrl,
      image,
    };
  }
  return button;
};

const resolveLinks = async (content) => {
  if (!content) return null;

  const contentFetchPromises = content.content.map(async (cnt) => {
    switch (cnt._type) {
      case 'cta':
        return processButtons(cnt);
      case 'priceTable':
    
        const servicePromises = cnt.service.map(async (service) => {
      
          const priceOptionPromises = service.priceOptions.map(async (priceOption) => {
        
            if (priceOption.button && priceOption.button._type === 'reference') {
              priceOption.button = await processButton(priceOption.button);
            }
            return priceOption;
          });
          service.priceOptions = await Promise.all(priceOptionPromises);
          return service;
        });
        cnt.service = await Promise.all(servicePromises);
        return cnt;
        case 'grid':
          const cardPromises = cnt.items.map(async (item) => {
            if (item.buttons) {
              item = await processButtons(item);
            }
            return item;
          });
          cnt.cards = await Promise.all(cardPromises);
          return cnt;
      default:
        return cnt;
    }
  });

  content.content = await Promise.all(contentFetchPromises);
  return content;
};

export default resolveLinks;
