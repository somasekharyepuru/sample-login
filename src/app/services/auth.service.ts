import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProjConstants } from '../constants/proj_const.cnst';
import { RoleToRouteMapping } from '../constants/role-to-route.cnst';
import { User } from '../models/user.model';
import { DataBaseService } from './data-base.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject: BehaviorSubject<null | User> = new BehaviorSubject(null);
  constructor(
    private dataBaseService: DataBaseService,
    private storageService: StorageService,
    private router: Router
  ) {
    const userDetails = this.getUserDetails();
    if (userDetails) {
      this.authSubject.next(userDetails);
    }
  }

  /**
   * methods
   * login
   * register
   * getUserDetails
   *
   */

  public login(user: Pick<User, 'userName' | 'password'>): Observable<User | Boolean> {
    return new Observable( observer => {
      this.dataBaseService.getUserByUserName(user.userName).subscribe( data => {
        console.log(data, 'data heres')
        if (data.password === user.password) {
          this.addUserInfoToStorage(data);
          this.routeToDashboard(data);
          this.authSubject.next(data);
          observer.next(data);
        } else {
          observer.error(new Error('Password did not match'));
        }
        observer.complete();
      }, error => {
        observer.error(new Error('No User Found'));
        observer.complete();
      })
    })
  }

  public register(user: User): Observable<User> {
    return new Observable(observer => {
      this.dataBaseService.addUser(user).subscribe( data => {
        this.addUserInfoToStorage(data);
        this.routeToDashboard(data);
        this.authSubject.next(data);
        observer.next(data);
        observer.complete();
      })
    })
  }

  public logout(): Observable<boolean> {
    console.log('comig here');

    return new Observable( observer => {
      this.storageService.remove('userInfo');
      console.log(this.storageService.get('userInfo'))
      this.authSubject.next(null);
      this.router.navigateByUrl(ProjConstants.LOGIN_ROUTE);
      observer.next(true);
      observer.complete();
    })
  }
  public getUserDetails() : User {
    return this.storageService.get('userInfo')
  }

  private addUserInfoToStorage(user: User): void {
    this.storageService.add('userInfo', user);
    return;
  }

  public isUserLoggedIn(): boolean {
    return this.storageService.get('userInfo') ? true : false
  }

  private routeToDashboard(data: User): void {
    const route = RoleToRouteMapping[data.role] || ProjConstants.LOGIN_ROUTE;
    this.router.navigateByUrl(route);
  }
}
