import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private unsubscribe = new Subject<void>();

    constructor(private authService: AuthService) { }

    ngOnInit(): void {}

    login(username: string, password: string) {
        this.authService.login(username, password).pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(data => {
            console.log(data.result)
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
