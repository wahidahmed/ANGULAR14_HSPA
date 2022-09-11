import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../Models/IPropertyBase';
import { Property } from '../Models/Property';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) {

   }

   getPropertyById(id:number){
     return this.getAllProperties().pipe(
        map(pArr=>{
          // throw new Error('something error');
         return pArr.find(p=>p.Id===id);
        })
      );
   }
  getAllProperties(sellRent?:number):Observable<Property[]>{
   return this.http.get('data/properties.json').pipe(
    map(data=>{
      let propArray:Array<Property>=[];
      const localData=JSON.parse(localStorage.getItem('newProperty')) ;
      if(localData){
        for (const key in localData) {
          if (sellRent){
            if(localData.hasOwnProperty(key)&& localData[key].SellRent==sellRent){
              propArray.push(data[key]);
            }
          }
          else{
            propArray.push(localData[key]);
          }
        }
      }


      for (const id in data) {
        if (sellRent) {
          if(data.hasOwnProperty(id)&& data[id].SellRent===sellRent){
            propArray.push(data[id]);
          }
        }
        else{
          propArray.push(data[id]);
        }

      }

      return propArray;
    })
   );
  }

  addProperty(property:Property){
    let properties=[property];
    if (localStorage.getItem('newProperty')) {
      properties=[property,...JSON.parse(localStorage.getItem('newProperty'))]
    }
    localStorage.setItem('newProperty',JSON.stringify(properties))
  }

  newPropID(){
   let prvPId=localStorage.getItem('PID');
   if(prvPId){
       localStorage.setItem('PID',(Number(prvPId)+1).toString()) ;
   }
   else{
    localStorage.setItem('PID','101');
   }
   return Number(localStorage.getItem('PID'));
  }
}
