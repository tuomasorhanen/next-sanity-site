import { groq } from 'next-sanity';
import { client } from '../client/client';

export const resolveHrefFromRef = async _ref => {
  const internalLinkQuery = groq`*[_id == '${_ref}'][0]{
    "slug": slug.current,
    _type,
  }`;

  try {
    const result = await client.fetch(internalLinkQuery);
    if (result && result.slug && result._type) {
      let basePath = '/';
      if (result._type === 'post') {
        basePath = '/blogi/';
      }
      if (result._type === 'offers') {
        basePath = '/tarjoukset/';
      }
      if (result._type === 'groups') {
        basePath = '/pienryhmat/';
      }

      return `${basePath}${result.slug}`;
    }
    return '/';
  } catch (error) {
    console.error('Error fetching document:', error);
    return '/';
  }
};
