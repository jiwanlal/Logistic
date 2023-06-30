import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
export class userdeatils {
  success: boolean;
  data: string;
}
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  public clientDetails:userdeatils
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.authService.getUserList().subscribe(res=>{
      if(res.success==true){
        this.clientDetails=res.data.values
        
      }
      
    })
  
    this.authForm = this.formBuilder.group({
      clientid:[null, Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get loginform() {
    return this.authForm.controls;
  }

  onSubmit() {
    
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.loginform.clientid.value,this.loginform.username.value, this.loginform.password.value)
        .subscribe(
          (res) => {
            console.log(res)
           // localStorage.setItem("currentUser", "All");
            if (res.accessToken!=null||res.accessToken!=undefined) {
              console.log(res.accessToken)
              this.router.navigate(["/admin/dashboards/main"]);
              

              setTimeout(() => {
              const role = this.authService.currentUserValue.role;
              console.log(role)
              const accessToken = this.authService.currentUserValue.accessToken;
             // localStorage.setItem('accessToken',res.accessToken);
           //  if(role=='Admin' ){
              this.router.navigate(["/admin/dashboards/main"]);
            // }
             
              
                // if (role === Role.All || role === Role.Admin) {
                //   this.router.navigate(["/admin/dashboard/main"]);
                // } else if (role === Role.Doctor) {
                //   this.router.navigate(["/doctor/dashboard"]);
                // } else if (role === Role.Patient) {
                //   this.router.navigate(["/patient/dashboard"]);
                // } else {
                //   this.router.navigate(["/authentication/signin"]);
                // }
                this.loading = false;
              }, 1000);
            } else {
              this.error = "Invalid Login";
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}
