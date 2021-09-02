import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;
  passwordsMatch: boolean = true;
  errors: string[];

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,) { }

  ngOnInit() {
    //this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  checkPasswordsMatch() {
    const form = this.registerForm.value;
    if (form.password !== "" && form.confirmPassword !== "" && form.password != form.confirmPassword) {
      this.passwordsMatch = false;
    }
    else {
      this.passwordsMatch = true;
    }
  }

  createLoginForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
    this.registerForm = this.fb.group({
      email: [null,
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]
      ],
      password: ['',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
        ]],
      confirmPassword: ['',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
        ]],
      displayName: [null,
        [Validators.required]
      ]
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.accountService.loggedInEvent.emit();
      this.router.navigateByUrl("/stock/list");
    }, error => {
      console.log(error.error.errors);
      this.errors = error.error.errors;
    });
  }
}
