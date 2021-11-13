import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take } from 'rxjs/operators';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(private dataBaseService: DataBaseService) { }

  public passwordPatternValidator(): ValidatorFn {
    return (control : AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    }
  }

  public userNameAvailability(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> =>  {
      if (!control.value) {
        return of(null);
      }
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap( val => {
          return this.dataBaseService.getUserByUserName(control.value).pipe(
            map (res => {
              console.log('came here')
              return res ? {userNameExists: true} : null
            }),
            catchError( error => of(null))
          )
        })
      )

    }
  }
}
