export interface Function {
  _id?: string;
  cinema_id: string;
  room_id: string;
  movie_id: string;
  from: string;
  to: string;
  nSeats?: string;
  occupiedSeats?: Number[];
}
