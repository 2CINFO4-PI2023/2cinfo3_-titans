export interface IReclamationBody{
    _id: string;
  name: string;
  email: string;
  phone: string;
  type: {
    _id: string;
    type: string;
    stype: string;
  };
  message: string;
}