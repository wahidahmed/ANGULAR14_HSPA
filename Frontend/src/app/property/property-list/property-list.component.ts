import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/Models/IPropertyBase';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

sellRent=1;
  properties:Array<IPropertyBase>;

  constructor(private housingService:HousingService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    if(this.route.snapshot.url.toString()){
      this.sellRent=2;
    }
    this.housingService.getAllProperties(this.sellRent).subscribe(
      (data)=>{
        this.properties=data;
      },
      (err)=>{
        console.log(err)
      }
    )
  }

}
