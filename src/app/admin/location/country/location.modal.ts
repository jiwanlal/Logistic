export class countrydatamodal {
    success:boolean
    data:Array<coutryattribute>
}
export class zonedatamodal {
  success:boolean
  data:Array<zoneattribute>
 
}
export class regionmodal {
  success:boolean
  data:Array<regionattribute>
 
}
export class statemodal {
  success:boolean
  data:Array<stateattribute>
 
}
export class coutryattribute {
  public  id: number;
  public  country_name: string;
    public Actions 
    public actionIcons
    public popupForm
   
}
export class zoneattribute {
  public id: number;
  public country_id: number;
  public zone_name:string;
  public country_name: string
    public Actions 
    public actionIcons
    public popupForm 
   
}
export class regionattribute {
  public id: number;
  public zone_id: number;
  public zone_name:string;
  public region_name: string
    public Actions 
    public actionIcons
    public popupForm 
   
}
export class stateattribute {
  public id: number;
  public state_name:string;
  public region_id: Number
    public Actions 
    public actionIconss
    public popupForm 
   
}

