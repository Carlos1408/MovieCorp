import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../interfaces/room';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private URL_API = `${environment.API_BASE_URL}/api/v1/rooms`;

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.URL_API);
  }

  getRoom(_id: string): Observable<Room> {
    return this.http.get<Room>(`${this.URL_API}/${_id}`);
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.URL_API, room);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.URL_API}/${room._id}`, room);
  }

  deleteRoom(_id: string): Observable<Room> {
    return this.http.delete<Room>(`${this.URL_API}/${_id}`);
  }
}
