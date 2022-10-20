import { Movie } from './movie';
import { Room } from './room';

export interface Cinema {
  _id?: string;
  name: string;
  address: string;
  imagePath: string;
  movies_ids?: String[];
  movies?: Movie[];
  rooms_ids?: String[];
  rooms?: Room[];
  createdAt?: string;
  updateAt?: string;
}
