import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private userList: User[] = [
    {
      userName: 'somasekhar233',
      password: '12345678',
      id: 'ahjds083ui09nhl',
      email: 'somasekharyepuru@gmail.com',
      role: 'USER'
    }
  ];
  constructor() { }


  // methods available
  /**
   * get users
   * add user
   * remove user
   * update user
   * get user data by id
   *
   */


  public getUsers(): Observable<User[]> {
    return new Observable( observer => {
      observer.next(this.userList.slice());
      observer.complete();
    })
  }
  /**
   *
   * @param user user filed to add
   */
  public addUser(user: User) : Observable<User> {
    return new Observable(observer => {
      this.userList.push(user);
      observer.next(user);
      observer.complete();
    })
  }

  public getUserByUserName(userName: string) : Observable<User> {
    return new Observable( observer => {
      const userData = this.userList.find( userElement => userElement.userName === userName);
      if (userData) {
        observer.next(userData);
        observer.complete();
      } else {
        observer.error(new Error('User Details not found'))
      }
    })
  }

}
