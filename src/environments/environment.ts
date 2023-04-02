// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
 
  apiUrl: 'http://localhost:3000/api/',
  authenticate:'auth/login',
  changepassword:'auth/changepassword',
  menutree:'menus/menu',
  profile:'image/profile',
  status:'users/status',
  companies:'companies/company',
  countery:'places/country',
  zone:'places/zone',
  region:'places/region',
  state:'places/state',
  city:'places/city',
  postcode:'places/postcode',
  locality:'places/locality',
  awbtype :'awb/awbtype',
  awbtypefill :'awb/awbfill',
  office:'businesses/office',
  business:'businesses/business',
  branch:'businesses/branch',
  role:'users/role',
  user:'users/user',
  awbsalesfill :'awb/awbsalesfillvalues',
  awbsales :'awb/awbsales',
  awbpurchasefill :'awb/awbpurchasefillvalues',
  awbpurchase :'awb/awbpurchase',
  awbissuefill :'awb/awbissuefillvalues',
  awbissue :'awb/awbissue',
  postcodeall:'places/postcode/all',
  bookingAwbNumber:'book/awbnumber',
  bookingOffice:'book/office',
  bookingPincode:'book/pincode',
  bookingState:'book/bstate',
  bookingFillvalues:'book/fillvalues',
  searchPostcode:'book/postcode',
  searchCities:'book/city',
  searchstates:'book/state',
  localitiesOnPostCodes:'book/localitiesonpostcode',
  booking:'book/booking',
  manifestFill:'manifest/fillvalues',
  manifest:'manifest/manifest',
  manifestdetail:'manifest/manifestdetail',
  
  
   //apiUrl:'http://location:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
