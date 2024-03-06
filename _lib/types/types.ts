//Core types
export type ISiteSettings = {
  _id: string;
  companyName: string;
  logo: ISanityImage;
  accentColor: IColor;
  textColor: IColor;
  bgColor: IColor;
  layerColor: IColor;
};

export type IPage = {
  _id: string;
  _rev: string;
  _type: 'page';
  name: string;
  slug: ISlug;
  showInMenu: boolean;
  showInFooter: boolean;
  menuOrder?: number;
  hasSubPages?: boolean;
  subPages?: IPage[];
  metadata?: {
    title: string;
    description: string;
    image: ISanityImage;
  };
  mainHero?: IHero;
  content?: any[];
};

export type ICallToAction = {
  _ref: string;
  _key: any;
  _id: string;
  _type: string;
  callToAction: string;
  buttonName: string;
  navigateToPage?: string;
  navigateToUrl?: string;
  linkType: string;
  image?: ISanityImage;
  style: 'style1' | 'style2';
};

export type IService = {
  slug: ISlug;
  name: string;
  description: string;
  image: ISanityImage;
  priceOptions: IPrice[];
  features: string[];
  content: any[];
};

export type IPrice = {
  duration: number;
  price: number;
  description: string;
  unit: string;
  button: ICallToAction;
  location: 'Tampere' | 'Pirkkala' | 'Lielahti' | 'All';
};

export type IPriceTable = {
  _id: string;
  _key: string;
  _type: string;
  service: IService[];
  location: 'Tampere' | 'Pirkkala' | 'Lielahti' | 'All';
  additionalInfo: string;
};

export type IRefernceItem = {
  _id: string;
  _ref: string;
  _type: string;
  title: string;
  slug: ISlug;
  image: ISanityImage;
  content: any[];
  excerpt: any[];
};

export type IColor = {
  value: any;
  alpha: number;
  hex: string;
};

export type ISpacer = {
  _key: string;
  Size: 'small' | 'medium' | 'large';
};

export type IUiElement = {
  _key: string;
  _type: 'uiElement';
  style: 'wave';
};

export type IFaq = {
  _id: string;
  _key: string;
  _type: string;
  question: string;
  answer: string;
};

export type IFaqList = {
  _id: string;
  _key: string;
  _type: string;
  faqList: IFaq[];
};

export type ISanityImage = {
  src?: any;
  _key?: string;
  alt: string;
  _id?: string;
  url?: any;
  _type?: string;
  asset: {
    url(url: any): unknown;
    _ref: string;
    _type: string;
  };
};

export type ICustomButton = {
  _id: string;
  _key: string;
  buttons: ICallToAction[];
};

export type IHero = {
  _id: string;
  _key: string;
  _type: string;
  content: any[];
  image?: ISanityImage;
  buttons?: ICallToAction[];
  layout: 'image-bg-center-slim' | 'simple-image-right' | 'simple-image-left' | 'image-bg-center' | 'image-bg-center-wide' | 'banner' | 'none';
  opacity?: number;
  heroBgColor?: IColor;
  CtaBgColor?: IColor;
};

export type ICard = {
  _id: string;
  _key: string;
  _type: string;
  content: any[];
  image?: ISanityImage;
  buttons?: ICallToAction[];
  layout: 'image-top' | 'image-bg' | 'simple';
};

export type IGrid = {
  _id: string;
  _key: string;
  title: string;
  marginTop?: string;
  columns: IColumns;
  items: ICard[] | IRefernceItem[];
  style: 'default' | 'carousel';
};

export type ICarousel = {
  _id: string;
  _key: string;
  _type: string;
  title: string;
  carouselTextColor?: IColor;
  carouselBgColor?: IColor;
  opacity?: number;
  carouselItems: any[];
};

export type IColumns = {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

export type IHeadingAndTitle = {
  _id: string;
  _type: string;
  _key: string;
  content: any[];
  style: 'centered' | 'left';
};

export type IPageProps = {
  name: string;
  businessId: string;
  content: any[];
  mainHero: IHero;
  menu: IPage[];
  notFound: boolean;
  title: string;
  description: string;
  image: any;
};

export type IReference = {
  _id: string;
  _ref: string;
  _type: string;
  alt: string;
};

export type ISlug = {
  current: string;
  _type: string;
};

export type IContactForm = {
  _id: string;
  _key: string;
  _type: string;
  layout: 'simple-right';
  thankYouMessage: string;
  title: string;
  description: string;
};
