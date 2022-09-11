import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/Models/IPropertyBase';
import { Property } from 'src/app/Models/Property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
// import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-Add-Property',
  templateUrl: './Add-Property.component.html',
  styleUrls: ['./Add-Property.component.css']
})
export class AddPropertyComponent implements OnInit {

  nextClicked:boolean;

propertyType:Array<string>=['House','Apartment','Duplex'];

furnishType:Array<string>=['Fully','Semi','Unfurnished'];


  // @ViewChild('Form') addPropertyForm:NgForm;

  @ViewChild('formTabs') formTabs?: TabsetComponent;



addPropertyForm:FormGroup

  propertyView:IPropertyBase={
    Id: 0,
    Name: '',
    PType: '',
    Price: undefined,
    SellRent: 0,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  constructor(private router:Router,private fb:FormBuilder,private housingService:HousingService,private alertify:AlertifyService) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }


  createAddPropertyForm(){
    this.addPropertyForm=this.fb.group({
      basicInfo:this.fb.group({
        SellRent:['1',Validators.required],
        BHK:[null,Validators.required],
        PType:[null,Validators.required],
        FType:[null,Validators.required],
        Name:[null,[Validators.required, Validators.minLength(5)]],
        City:[null,Validators.required]
      }),
      priceInfo:this.fb.group({
        Price:[null,Validators.required],
        BuiltArea:[null,Validators.required],
        CarpetArea:[null],
        Security:[null],
        Maintenance:[null]
      }),
      addressInfo:this.fb.group({
        FloorNo:[null],
        TotalFloor:[null],
        Address:[null,Validators.required],
        LandMark:[null]
      }),
      othersInfo:this.fb.group({
        RTM:[null,Validators.required],
        PossessionOn:[null],
        AOP:[null],
        Gated:[null],
        MainEntrance:[null],
        Description:[null]
      }),

    })
  }


  get getBasicInfo(){return this.addPropertyForm.controls['basicInfo'] as FormGroup;}
  get getSellRent(){return this.getBasicInfo.controls['SellRent'] as FormControl;}
  get getBHK(){return this.getBasicInfo.controls['BHK'] as FormControl;}
  get getPType(){return this.getBasicInfo.controls['PType'] as FormControl;}
  get getFType(){return this.getBasicInfo.controls['FType'] as FormControl;}
  get getName(){return this.getBasicInfo.controls['Name'] as FormControl;}
  get getCity(){return this.getBasicInfo.controls['City'] as FormControl;}

  get getPriceInfo(){return this.addPropertyForm.controls['priceInfo'] as FormGroup;}
  get getPrice(){return this.getPriceInfo.controls['Price'] as FormControl;}
  get getBuiltArea(){return this.getPriceInfo.controls['BuiltArea'] as FormControl;}
  get getCarpetArea(){return this.getPriceInfo.controls['CarpetArea'] as FormControl}
  get getSecurity(){return this.getPriceInfo.controls['Security'] as FormControl}
  get getMaintenance(){return this.getPriceInfo.controls['Maintenance'] as FormControl}


  get getAddressInfo(){return this.addPropertyForm.controls['addressInfo'] as FormGroup;}
  get getFloorNo(){return this.getAddressInfo.controls['FloorNo'] as FormControl;}
  get getTotalFloor(){return this.getAddressInfo.controls['TotalFloor'] as FormControl;}
  get getAddress(){return this.getAddressInfo.controls['Address'] as FormControl;}
  get getLandMark(){return this.getAddressInfo.controls['LandMark'] as FormControl;}

  get getOthersInfo(){return this.addPropertyForm.controls['othersInfo'] as FormGroup;}
  get getRTM(){return this.getOthersInfo.controls['RTM'] as FormControl;}
  get getPossessionOn(){return this.getOthersInfo.controls['PossessionOn'] as FormControl;}
  get getAOP(){return this.getOthersInfo.controls['AOP'] as FormControl;}
  get getGated(){return this.getOthersInfo.controls['Gated'] as FormControl;}
  get getMainEntrance(){return this.getOthersInfo.controls['MainEntrance'] as FormControl;}
  get getDescription(){return this.getOthersInfo.controls['Description'] as FormControl;}




  selectTab(nextTabId: number,isValid?:boolean) {
    this.nextClicked=true;
    if (isValid) {
      this.formTabs.tabs[nextTabId].active = true;
    }
  }

  onBack(){
      this.router.navigate(['/']);
  }


  prop=new Property();

mapProperty():void{
  this.prop.Id=this.housingService.newPropID();
  this.prop.SellRent = +this.getSellRent.value;
    this.prop.BHK = this.getBHK.value;
    this.prop.PType = this.getPType.value;
    this.prop.Name = this.getName.value;
    this.prop.City = this.getCity.value;
    this.prop.FType = this.getFType.value;
    this.prop.Price = this.getPrice.value;
    this.prop.Security = this.getSecurity.value;
    this.prop.Maintenance = this.getMainEntrance.value;
    this.prop.BuiltArea = this.getBuiltArea.value;
    this.prop.CarpetArea = this.getCarpetArea.value;
    this.prop.FloorNo = this.getFloorNo.value;
    this.prop.TotalFloor = this.getTotalFloor.value;
    this.prop.Address = this.getAddress.value;
    this.prop.Address2 = this.getLandMark.value;
    this.prop.RTM = this.getRTM.value;
    this.prop.AOP = this.getAOP.value;
    this.prop.Gated = this.getGated.value;
    this.prop.MainEntrance = this.getMainEntrance.value;
    this.prop.Possession = this.getPossessionOn.value;
    this.prop.Description = this.getDescription.value;
    this.prop.PostedOn = new Date().toString();
}
  onSubmit(){
    this.nextClicked=true;
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.prop);
      this.alertify.success('success');
      if(this.getSellRent.value=='2'){
        this.router.navigate(['/rent-property']);
      }
      else{
        this.router.navigate(['/']);
      }

    }
    else{
      this.alertify.error('fill all mandatory fields')
    }
    console.log(this.addPropertyForm)
  }


  allTabsValid():boolean{

    if(this.getBasicInfo.invalid){
        this.formTabs.tabs[0].active=true;
      return false;
    }
    if(this.getPriceInfo.invalid){
      this.formTabs.tabs[1].active=true;
      return false;
    }
   if(this.getAddressInfo.invalid){
    this.formTabs.tabs[2].active=true;
    return false;
    }
    if(this.getOthersInfo.invalid){
      this.formTabs.tabs[3].active=true;
      return false;
    }

    return true;
  }
}
