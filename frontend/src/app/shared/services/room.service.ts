import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../interfaces/room';
import { Observable, of } from 'rxjs';
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

  getAllRoomsLg(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL_API}/lg`);
  }

  getRoom(_id: string): Observable<Room> {
    return this.http.get<Room>(`${this.URL_API}/${_id}`);
  }

  getRoomLg(_id: string): Observable<Room> {
    return this.http.get<Room>(`${this.URL_API}/lg/${_id}`);
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

  isTimeRangeAvailable(
    room: Room | null,
    from: Date,
    to: Date
  ): Observable<boolean> {
    let result = true;
    if (room) {
      room.timeRanges.forEach((tr) => {
        const d: Date = new Date(tr.from);
        const h: Date = new Date(tr.to);
        const i: Date = from;
        const f: Date = to;
        if (i.getHours() > h.getHours() && f.getHours() > h.getHours()) {
          if (!(i.getHours() > d.getHours() && f.getHours() > d.getHours()))
            result = false;
        } else if (i.getHours() < d.getHours() && f.getHours() < d.getHours()) {
          if (!(i.getHours() < h.getHours() && f.getHours() < h.getHours()))
            result = false;
        } else if (
          i.getHours() < d.getHours() &&
          f.getHours() === d.getHours()
        ) {
          if (!(f.getMinutes() < d.getMinutes())) result = false;
        } else if (
          i.getHours() === h.getHours() &&
          f.getHours() > h.getHours()
        ) {
          if (!(i.getMinutes() > h.getMinutes())) result = false;
        } else result = false;
      });
    }
    return of(result);
  }
}
