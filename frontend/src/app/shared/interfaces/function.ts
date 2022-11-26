import { Cinema } from './cinema';
import { Movie } from './movie';
import { Room } from './room';

export interface Function {
  _id?: string;
  cinema_id: string;
  cinema?: Cinema;
  room_id: string;
  room?: Room;
  movie_id: string;
  movie?: Movie;
  from: string;
  to: string;
  nSeats?: string;
  occupiedSeats?: string[];
}
