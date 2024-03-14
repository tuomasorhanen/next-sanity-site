//This file is used to define the shape of the data coming in from Sanity and is used to define the shape of the data in the services and components.

//All types for Sanity data contain these base properties
interface IBase {
  _id: string;
  _key: string;
  _type: string;
}

//Core types
export interface ISiteSettings extends IBase {
  companyName: string;
  logo: ISanityImage;
  title: string;
  description: string;
  image: ISanityImage;
  keywords: string[];
  domain: string;
  socialMedia?: ISocialMedia[];
};

export interface IPage extends IBase {
  name: string;
  slug: ISlug;
  showInMenu: boolean;
  showInFooter: boolean;
  menuOrder?: number;
  hasSubPages?: boolean;
  subPages?: IPage[];
  metadata: IMetadata;
  hero: IHero;
  content?: any[];
};

export interface IMenu {
  menu: IPage[];
  logo?: ISiteSettings['logo'];
  footer?: Pick<ISiteSettings, 'socialMedia' | 'companyName'>;
}

export interface IService extends IBase {
  slug?: ISlug;
  name: string;
  metadata: IMetadata;
  priceOptions: IPrice[];
  hero?: IHero;
  content?: any[];
};

export interface IPriceTable extends IBase {
  layout: 'default-table' | 'dropdown-banner';
  location: ILocation[]
  service: IService[];
  title?: string;
  description?: string;
};

export interface ICallToAction extends IBase{
  buttonName?: string;
  callToAction: string;
  linkType: string;
  navigateToPage?: string;
  navigateToUrl?: string;
  buttonContent: 'text' | 'image';
  image?: ISanityImage;
  style?: 'style1' | 'style2';
};

//Post, Groups, Offers are all referenceItems (Technically the types should be expanded but for now they are identical and can use the same type.)
export interface IRefernceItem extends IBase {
  title: string;
  slug: ISlug;
  image: ISanityImage;
  description: string;
  content: any[];
  excerpt: any[];
  showForm: boolean;
  form: IContactForm;
  author?: IPerson;
  publishedAt?: string;
  _updatedAt?: string;
};
export interface IGroup extends IBase {
  title: string;
  slug: ISlug;
  image: ISanityImage;
  description: string;
  content: any[];
  excerpt: any[];
  showForm: boolean;
  form: IContactForm;
  location: ILocation;
  price: IPrice;
  startDate: string;
  endDate: string;
  publishedAt?: string;
  _updatedAt?: string;
};

export interface IPerson extends IBase {
  name: string;
  image: ISanityImage;
  bio: string;
};

export interface IFaqList extends IBase {
  faqList: IFaq[];
};

//Src, Alt and Url are optional because images are resolved in the CustomImage component which receives only set asset._ref value.
export interface ISanityImage extends IBase {
  src?: any;
  alt?: string;
  url?: any;
  asset: {
    url?: string;
    _ref?: string;
    _type: string;
  };
};

//TODO Hero type is used for both Hero and CallToAction types. This should be refactored to separate types.
export interface IHero extends IBase {
  content: any[];
  image?: ISanityImage;
  buttons?: ICallToAction[];
  layout: 'image-bg-center-slim' | 'simple-image-right' | 'simple-image-left' | 'image-bg-center' | 'image-bg-center-wide' | 'banner' | 'none' | 'heading' | 'simple-image-right-centered';
  opacity?: number;
  heroBgColor?: IColor;
  CtaBgColor?: IColor;
};

export interface ICard extends IBase {
  content: any[];
  image?: ISanityImage;
  buttons?: ICallToAction[];
  layout: 'image-top' | 'image-bg' | 'simple';
};

export interface IGrid extends IBase {
  title: string;
  marginTop?: string;
  columns: IColumns;
  items: ICard[] | IRefernceItem[];
  style: 'default' | 'carousel';
};

export interface ICarousel extends IBase{
  title: string;
  carouselTextColor?: IColor;
  carouselBgColor?: IColor;
  opacity?: number;
  carouselItems: any[];
};

export interface IHeadingAndTitle extends IBase {
  content: any[];
  style: 'centered' | 'left';
};

export interface IReference extends IBase {
  _ref: string;
  alt: string;
};

export interface IContactForm extends IBase {
  layout: 'simple-right';
  thankYouMessage: string;
  title: string;
  description: string;
};

interface IMetadata {
  title: string;
  description: string;
  image: ISanityImage;
};

interface ISocialMedia extends IBase{
  name: string;
  url: string;
};

//Color is coming in as RGBA string from Sanity and any type works just fine here.
interface IColor {
  value: any;
};

export interface IFaq extends IBase {
  question: string;
  answer: string;
};

//TODO PriceOption is currently required but all fields in price are optional. This needs to be fixed. Furthermore, the location field should be abstracted.

interface IPrice {
  location?: ILocation;
  duration?: number;
  unit?: string;
  price?: number;
  description?: string;
  button?: ICallToAction;
};

interface IColumns {
  small: string;
  medium: string;
  large: string;
};

interface ISlug {
  current: string;
  _type: string;
};

interface ILocation {
  title: string;
  city: string;
  place: string;
  address: string;
}