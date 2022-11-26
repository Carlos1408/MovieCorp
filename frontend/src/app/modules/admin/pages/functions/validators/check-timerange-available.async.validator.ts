import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RoomService } from 'src/app/shared/services/room.service';

export function checkTimeRangeAvailable(
  roomService: RoomService
): AsyncValidatorFn {
  return (group: AbstractControl): Observable<ValidationErrors | null> => {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;
    const room = group.get('room')?.value;
    return roomService
      .isTimeRangeAvailable(room, from, to)
      .pipe(
        map((isAvailable) =>
          isAvailable ? null : { checkTimeRangeIsAvailable: true }
        )
      );
  };
}
