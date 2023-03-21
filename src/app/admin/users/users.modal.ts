
  export class rolemodal {
    success:boolean
    data:Array<roleattribute>
   
  }
  export class usermodal {
    success:boolean
    data:Array<roleattribute>
   
  }
  export class userattribute {
    public firstname:string;
    public last_name:string;
    public mobile:string;
    public email:string;
    public dob:string;
    public gender
    public  address:string
    public  company_id: number;
    public  company_name: string;
    public  country_id: number;
    public  country_name: string;
    public  state_id: number;
    public  state_name: string;
    public post_code_id:number;
    public post_code:string;
    public  city_id: number;
    public  city_name: string;
    public  user_id: number;
    public  user_name: string;
    public  role_id: number;
    public  role_name: string;
   
    public description:string
    

      public Actions 
      public actionIcons
      public popupForm
     
  }
  export class roleattribute {
    public  role_id: number;
    public  role_name: string;
    public description:string

      public Actions 
      public actionIcons
      public popupForm
     
  }