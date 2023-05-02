import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/service/auth.service";
import { DirectionService } from "src/app/core/service/direction.service";
import { LoaderService } from "src/app/core/service/loader.service";
import { NotificationService } from "src/app/core/service/notification.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: [],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  direction: string;
  public loader:boolean
  public config: any = {};
  constructor(private directoryService: DirectionService,  private authService: AuthService, private loaderservice:LoaderService) {
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
  loaderreer
  ngOnInit(): void {

    
   this.loaderservice.Loaderpage.subscribe(res=>{
    console.log(res)
    this.loader=res
  
   })
    const userdetails=JSON.parse(localStorage.getItem('currentUser'))
  console.log(userdetails)
  if(userdetails){
    this.authService.getselectUser(userdetails.id).subscribe(res=>{
      console.log(res)
      this.authService.currentUserDetails.next(res)
    })
  }
  
  }
  ngOnDestroy(): void {
    this.loaderreer=''
    this.loaderservice.Loaderpage.unsubscribe()
  }
   
}
