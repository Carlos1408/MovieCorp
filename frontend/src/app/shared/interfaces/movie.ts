import { Function } from "./function";

export interface Movie {
  _id?: string;
  title: string;
  synopsis: string;
  length: number;
  genre: string;
  rating: string;
  protagonists: string;
  director: string;
  imagePath?: string;
  trailer: string;
  functions?: Function[];
}
