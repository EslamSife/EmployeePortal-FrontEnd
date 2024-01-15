import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../common/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:9090/api/v1/employees';

  constructor(private httpClient: HttpClient) {
  }

  getEmployeeList(search?: string, sortField?: string, sortOrder?: string): Observable<Employee[]> {
    let params = new HttpParams();
    if (search) {
      params = params.append('search', search);
    }
    if (sortField && sortOrder) {
      params = params.append('sort', `${sortField},${sortOrder}`);
    }
    return this.httpClient.get<Employee[]>(this.baseUrl, { params: params });
  }


  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, employee);
  }

}
