import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/service/auth.service";
import { DirectionService } from "src/app/core/service/direction.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: [],
})
export class MainLayoutComponent implements OnInit {
  direction: string;
  public config: any = {};
  constructor(private directoryService: DirectionService,  private authService: AuthService,) {
    this.directoryService.currentData.subscribe((currentData) => {
      if (currentData) {
        this.direction = currentData;
      } else {
        if (localStorage.getItem("isRtl")) {
          if (localStorage.getItem("isRtl") === "true") {
            this.direction = "rtl";
          } else if (localStorage.getItem("isRtl") === "false") {
            this.direction = "ltr";
          }
        } else {
          if (this.config.layout.rtl == true) {
            this.direction = "rtl";
          } else {
            this.direction = "ltr";
          }
        }
      }
    });
  }
  ngOnInit(): void {
    console.log('hello')
    const userdetails=JSON.parse(localStorage.getItem('currentUser'))
  console.log(userdetails)
  if(userdetails){
    this.authService.getselectUser(userdetails.id).subscribe(res=>{
      console.log(res)
      this.authService.currentUserDetails.next(res)
    })
  }
  }
   
}
