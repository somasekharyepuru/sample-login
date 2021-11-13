import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ProjConstants } from 'src/app/constants/proj_const.cnst';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData: User | null;
  $destroy: Subject<Boolean> = new Subject();
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.authSubject.pipe(takeUntil(this.$destroy)).subscribe( data => {
      console.log(data, 'data here in the things')
      this.userData = data;
    })
  }

  public handleAuthButtonClick(): void {
    if (this.userData) {
      this.authService.logout().subscribe ( data => {
        console.log('Logged out successfuly')
      })
    }
    this.router.navigateByUrl(ProjConstants.LOGIN_ROUTE);
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

}
