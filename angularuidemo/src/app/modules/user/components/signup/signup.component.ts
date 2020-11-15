import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../../../providers/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fields() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.signUp(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
          Swal.fire('Something went wrong!', error.error, 'error');
          this.loading = false;
        });
  }

}
