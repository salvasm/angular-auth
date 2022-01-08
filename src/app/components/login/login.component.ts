import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private unsubscribe = new Subject<void>();
    public form: FormGroup;

    constructor(private authService: AuthService,
                private fb: FormBuilder,
                private router: Router,
                private _snackBar: MatSnackBar,
                private ls: LocalStorageService) {
                    
        if (authService.isUserAuthenticated) {
            this.router.navigateByUrl('dashboard');
        }

        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    ngOnInit(): void {}

    login() {
        const formValues = this.form.value;
        if (formValues.username && formValues.password) {
            this.authService.login(formValues.username, formValues.password).pipe(
                takeUntil(this.unsubscribe)
            ).subscribe(res => {
                this.ls.set('token', JSON.stringify(res.result))
                this.openSnackBar('Succesfuly login!', 'Close');
                this.router.navigateByUrl('dashboard');
            }, err => console.log(err));
        }
    }

    logout() {
        this.ls.remove('token');
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action);
      }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
