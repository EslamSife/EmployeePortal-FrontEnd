import {Component, OnInit} from '@angular/core';
import {Employee} from "../../common/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent  implements OnInit {

  employees: Employee[] = [];
  employee: Employee = new Employee();
  public employeeCreated: boolean = false;
  public creationMessage: string = '';
  searchCriteria: string = '';
  sortField: string = '';
  sortOrder: string = 'asc';

  constructor(private employeeService: EmployeeService) {
  }


  ngOnInit(): void {
    this.listEmployees();
  }

  listEmployees(searchCriteria?: string) {
    this.employeeService.getEmployeeList(searchCriteria).subscribe(
      data => {
        this.employees = data;
      }
    );
  }

  updateSearchCriteria() {
    this.listEmployees('fName:' + this.searchCriteria);
  }

  updateSort(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.listEmployees();
  }


  saveEmployee() {
    const action = this.employee.id ? 'updated' : 'created';
    let observable = this.employee.id
      ? this.employeeService.updateEmployee(this.employee.id, this.employee)
      : this.employeeService.createEmployee(this.employee);
    observable.subscribe(
      data => {
        console.log(data);
        this.employeeCreated = true;
        this.creationMessage = `Employee ${action} successfully!`;
        this.employee = new Employee();
        this.listEmployees();
        setTimeout(() => {
          this.employeeCreated = false;
        }, 3000);
      },
      error => {
        console.log(error);
        this.employeeCreated = false;
        this.creationMessage = `An error occurred while ${action} the employee.`;
      }
    );
  }


  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      data => {
        console.log(data);
        this.listEmployees(); // Refresh the list
      },
      error => console.log(error));
  }

  editEmployee(emp: Employee) {
    this.employee = Object.assign({}, emp);
  }

}
