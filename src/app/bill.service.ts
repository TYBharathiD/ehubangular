import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  stackDetails: any = [];
  // stackDetails: any = []

  constructor(private http: HttpClient, private router: Router) { }
  urlbill: string = 'http://localhost:8080/billable/billable';
  urlTech: String = 'http://localhost:8080/billable/getByTech';
  array;
  selectedBillable: any = {
    empName: null,
    deployementDate: null,
    contractEndDate: null,
    rateCardPerMonth: null,
    stack: null,
    yoe: null
  }
  postData(bill) {
    return this.http.post(`${this.urlbill}`, bill);
  }
  updateData(bill) {
    return this.http.put(`${this.urlbill}`, bill);
  }
  getBillData() {
    return this.http.get(`${this.urlbill}`);
  }

  deleteClientData(data) {
    return this.http.delete(`${this.urlbill}/${data.employeeId}`)
  }

  getBills(): Observable<any> {

    return this.http.get('http://localhost:8080/billable/getbill');
  }

  getStackCount(): Observable<any> {

    return this.http.get('http://localhost:8080/billable/stackCountMap')
  }
  getExpList(): Observable<any> {
    return this.http.get('http://localhost:8080/billable/getexpi')
  }

  getExpiCount(): Observable<any> {
    return this.http.get('http://localhost:8080/billable/expCountMap')
  }

  postDataPack(data) {
    return this.http.post<any>('http://localhost:8080/package/package', data);
  }

  getPackData() {
    return this.http.get('http://localhost:8080/package/package')
  }
  getRevenuList(): Observable<any> {

    return this.http.get('http://localhost:8080/package/revenuList');

  }

  getOverAllProfit(): Observable<any> {

    return this.http.get('http://localhost:8080/package/profit');
  }

  getYearWiseEmpList(): Observable<any> {

    return this.http.get('http://localhost:8080/package/yearEmpMapList');
  }
  getTechnology(name) {

    return this.http.get(`${this.urlTech}/${name}`).subscribe(billableStackDetails => {
      // debugger
      this.stackDetails = billableStackDetails['billList'];
      // console.log("hgggggggg",this.stackDetails);
      this.router.navigateByUrl('/billdetails')
    }, err => {
      console.log(err)
    }, () => {
      console.log('Employee details with respect to stack got scccessfully')
    });
  }

}
