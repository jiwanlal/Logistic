import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaxValidator, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/admin/users/users.service';
import { BusinessesService } from 'src/app/admin/businesses/businesses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  filteredOptions: Observable<string[]>;
 public rolelist=[]
  public compnaylist=[]
  public officelist=[]
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,public usersservice:UsersService,public businessservice:BusinessesService,private snackBar: MatSnackBar,
  ) {}
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: [''],
      Email: ['',[Validators.required, Validators.email]],
      Mobile:['' ,[Validators.required,Validators.pattern("^((\\?)|)?[0-9]{10}$")]],
      Company:['' ,[Validators.required]],
      Office:['' ,[Validators.required]],
      

    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.Onstatelist()
    this.filteredOptions = this.authForm.controls.Office.valueChanges.pipe(
      startWith(''),
      map(value => {
      //  console.log(value)
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.officelist.filter(option => option?.office_name?.toLowerCase().includes(value?.toLowerCase()));
      }),
     // map(value => this._filter(value || '')),
    );
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      let itemvalue={
        first_name:this.authForm.get('FirstName').value,
        last_name:this.authForm.get('LastName').value,
        company_id:this.authForm.get('Company').value,
        office_id:this.authForm.get('Office').value.office_id,
        email:this.authForm.get('Email').value,
        mobile:this.authForm.get('Mobile').value,
        
  
       // state_id:row_obj.state_id
      }
      this.usersservice.userpost(itemvalue).subscribe((res)=>{
          console.log(res)
          if(res.success==true){
            this.showNotification(
            
              "snackbar-success",
              "Add Record Successfully...!!!",
              "top",
              "right"
            );
            window.location.reload();
          }
        
          
         
         
        },
       (error)=>{
        this.showNotification(
          
          "snackbar-danger",
          `${error}`,
          "top",
          "right"
        );
        console.log(error)

       } 
        )
    }
  }
  Onstatelist(){

    this.usersservice.companyList().subscribe(res=>{
      
        setTimeout(() => {
          this.compnaylist=res.data.values
        }, 1000);
       // this.onobectitem(this.compnaylist)
     
      
    })
    this.businessservice.getofficelist().subscribe(res=>{
      
      setTimeout(() => {
        this.officelist=res.data.values
        console.log(this.officelist)
        
      }, 1000);
     // this.onobectitem(this.compnaylist)
    
    
    })
    
    
    this.usersservice.roleget().subscribe(res=>{
      setTimeout(() => {
        this.rolelist=res.data
      }, 1000);
      
    })
    }
    displayFn(selectedoption){
     // console.log(selectedoption)
  
      return selectedoption ? selectedoption.office_name : undefined;
     }
    private _filter(value: string): string[] {
      console.log(value)
      const filterValue = value.toLowerCase();
  
      return this.officelist.filter(option => option.toLowerCase().includes(filterValue));
    }
}
