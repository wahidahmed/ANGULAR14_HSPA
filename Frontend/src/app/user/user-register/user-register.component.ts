import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/IUser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm:FormGroup;

  user:IUser;
  isSubmit:boolean;

  constructor(private fb:FormBuilder,private userService:UserServiceService,private alertify:AlertifyService){}

  ngOnInit() {

    // this.registrationForm=new FormGroup(
    //   {
    //     userName:new FormControl(null,Validators.required),
    //     email:new FormControl(null,[Validators.email,Validators.required]),
    //     password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //     confirmPassword:new FormControl(null,[Validators.required]),
    //     mobile:new FormControl(null,[Validators.required,Validators.maxLength(10)])
    //   },
    //   this.passwordMatching
    // )

    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm=this.fb.group(
      {
        userName:[null,Validators.required],
        email:[null,[Validators.email,Validators.required]],
        password:[null,[Validators.required,Validators.minLength(3)]],
        confirmPassword:[null,[Validators.required]],
        mobile:[null,[Validators.required,Validators.maxLength(10)]]
      },{
        validators: [this.passwordMatching]
      }
    )
  }

  passwordMatching(fg:AbstractControl):Validators{
    let pass=fg.get('password')?.value;
    let conPass=fg.get('confirmPassword')?.value;


    return pass===conPass ? null:{'notMatched':true}
  }

  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }


  userDataMap():IUser{
    return this.user={
      UserName:this.userName.value,
      Mobile:this.mobile.value,
      Password:this.password.value,
      Email:this.email.value
    }
  }
  onSubmit(){
    console.log(this.registrationForm);

    this.isSubmit=true;
      if(this.registrationForm.valid){
        // this.user=Object.assign(this.user,this.registrationForm.value);

        this.userService.addUser(this.userDataMap());
        this.registrationForm.reset();
        this.isSubmit=false;
        this.alertify.success('save successfull');
      }
      else{
        this.alertify.error('Sorry, the form is not valid');

      }

  }


}
