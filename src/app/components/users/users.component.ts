import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
    private unsubscribe = new Subject<void>();
    public users: any;

    constructor(private userService: UsersService) { }

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.userService.getAll().pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(data => {
            this.users = data.result
        });
    }

    getUserById(id: string) {
        this.userService.getUserById(id).pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(data => {
            alert("Role: " + data.result.role + " Email: " + data.result.email)
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
