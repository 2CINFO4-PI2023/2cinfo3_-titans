export interface Plat{
    _id: String;
    name:  String;
    ingredients: { [key: string]: number };
    price: Number;
    image?: String;
}