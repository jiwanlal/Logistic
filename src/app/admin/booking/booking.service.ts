import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient) { }

  searchAWBNumber(str){
    const url = this.API_URL + environment.bookingAwbNumber + (str ? "/"+str:'')
   return this.http.get<any>(url)
  }
  searchPincode(str){
    if(typeof(str) == "number"){
      str = str.toString();
    }
    const url = this.API_URL + environment.searchPostcode + (str ? "/"+str:'')
   return this.http.get<any>(url)
  }
  searchCities(str){
    const url = this.API_URL + environment.searchCities + (str ? "/"+str:'')
   return this.http.get<any>(url)
  }
  searchStates(str){
    const url = this.API_URL + environment.searchstates + (str ? "/"+str:'')
   return this.http.get<any>(url)
  }

  getLocalitiesOnPostCode(id){
    const url = this.API_URL + environment.localitiesOnPostCodes + (id ? "/"+id:'')
   return this.http.get<any>(url)
  }

  getOfficeById(id){
    const url = this.API_URL + environment.bookingOffice + (id ? "/"+id:'')
   return this.http.get<any>(url)
  }

  getPincodeById(id){
    const url = this.API_URL + environment.bookingPincode + (id ? "/"+id:'')
   return this.http.get<any>(url)
  }

  getCityById(id){
    const url = this.API_URL + environment.city + (id ? "/"+id:'')
   return this.http.get<any>(url)
  }
  getStateById(id){
    const url = this.API_URL + environment.bookingState + (id ? "/"+id:'')
   return this.http.get<any>(url)
  }

  getFillValues(id){
    const url = this.API_URL + environment.bookingFillvalues + (id ? "/"+id:'')
   return this.http.get<any>(url)
  }

  CreateBooking(data,id){
    let url = this.API_URL + environment.booking 
    if(id){
      url += (id ? "/"+id:'');
      return this.http.put<any>(url,data)
    }
   return this.http.post<any>(url,data)
  }

  Getbookings(id=null){
    const url = this.API_URL + environment.booking
    return this.http.get<any>(url)
  }
  DeleteBooking(id){
    const url = this.API_URL + environment.booking  + (id ? "/"+id:'')
    return this.http.delete<any>(url)
  }

  GetConsignorDetail(mobileNo){
    const url = this.API_URL + environment.bookingconsignordetail  + (mobileNo ? "/"+mobileNo:'')
    return this.http.get<any>(url)
  }

  GetConsigneeDetail(mobileNo){
    const url = this.API_URL + environment.bookingconsigneedetail  + (mobileNo ? "/"+mobileNo:'')
    return this.http.get<any>(url)
  }


  //================= Manifest ========================

  GetFillValuesManifest(){
    const url = this.API_URL + environment.manifestFill
    return this.http.get<any>(url)
  }

  CreateManifest(data){
    const url = this.API_URL + environment.manifest
    return this.http.post<any>(url,data)
  }

  CreateManifestDetail(data,id){
    const url = this.API_URL + environment.manifestdetail + (id ? "/"+id:'')
    return this.http.post<any>(url,data)
  }

  DeleteManifest(id){
    const url = this.API_URL + environment.manifest  + (id ? "/"+id:'')
    return this.http.delete<any>(url)
  }

  GetManifests(){
    const url = this.API_URL + environment.manifest  
    return this.http.get<any>(url)
  }

}
