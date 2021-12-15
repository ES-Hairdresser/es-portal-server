export enum Target {
  UOMO = "Uomo",
  DONNA = "Donna",
  UNISEX = "Unisex",
  BAMBINO = "Bambino",
}

export interface ServiceType {
  id: String;
  name: String;
  price: Number;
  description: String;
  target: String;
}

export interface AddService {
  input: {
    name: String;
    price: Number;
    description: String;
    target: Target;
  };
}

export interface AddServiceResponse {
  id: String;
  isAdded: Boolean;
}
