import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {}
  user!: User | null;
  userSubscription!: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authService.user$
      .pipe(tap((user) => (this.user = user)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
