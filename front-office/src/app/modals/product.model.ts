// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  _id?: string;
  ingredients?: { [key: string]: number };
  image?: String;
  name?: string;
  price?: number;
  salePrice?: number = 2;
  plat?: any;
  discount?: number = 20;
  pictures?: Array<any>;
  small?: Array<string>;
  shortDetails?: string;
  description?: string;
  stock?: number;
  newPro?: boolean = true;
  brand?: string = "PurePlats";
  state?: string = "small";
  sale?: boolean = true;
  category?: string;
  tags?: ProductTags[];
  colors?: ProductColor[];

  constructor(
    _id?: string,
    name?: string,
    price?: number,
    ingredients?: { [key: string]: number },
    salePrice?: number,
    discount?: number,
    small?: Array<string>,
    shortDetails?: string,
    description?: string,
    stock?: number,
    newPro?: boolean,
    brand?: string,
    state?: string,
    sale?: boolean,
    category?: string,
    tags?: ProductTags[],
    pictures?: Array<any>,
    colors?: ProductColor[]
  ) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.salePrice = salePrice;
    this.discount = discount;
    this.pictures = pictures;
    this.shortDetails = shortDetails;
    this.description = description;
    this.stock = stock;
    this.newPro = newPro;
    this.brand = brand;
    this.state = state;
    this.sale = sale;
    this.category = category;
    this.tags = tags;
    this.colors = colors;
    this.small = small;
    this.ingredients = ingredients;
    pictures.push(this.image);
  }

 }
  // Color Filter
  export interface ColorFilter {
    color?: ProductColor;
  }
