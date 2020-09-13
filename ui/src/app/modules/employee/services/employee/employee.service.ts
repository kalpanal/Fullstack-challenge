import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../interfaces/employee.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    public get empDetailSubject$() {
        return this._empDetailSubject$;
    }
    private _empDetailSubject$ = new BehaviorSubject(null);
    private apiURL: string;

    constructor(private http: HttpClient) {
        this.apiURL = 'http://localhost:8080/challenge/api/v1/';
    }

    public getEmployeeList() {
        return this.http.get<Employee[]>(this.apiURL + 'findAllUsers');
    }

    public getEmployeeDetails(userId: string) {
        const data = this.http.get<Employee>(this.apiURL + 'findByUserId', { params: { userId: userId } });
        console.log(data);
        this._empDetailSubject$.next(data);
    }

}