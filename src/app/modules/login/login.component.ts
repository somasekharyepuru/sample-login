import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private customValidations: CustomValidationService
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  /**
   * login form
   * build login form
   * submit login form
   * erro verification
   */

  private buildLoginForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(8)], [this.customValidations.userNameAvailability()]],
      password: ['', [Validators.required, this.customValidations.passwordPatternValidator()] ]
    });
    this.loginForm.valueChanges.subscribe( data => {
      console.log(this.loginForm)
    })
  }

  public login(): void {
    this.authService.login(this.loginForm.value).subscribe ( data => {
      console.log('Login Success');
      this.loginForm.reset();
    }, error => {
      console.log(error, 'error in login')
    })
  }

}
