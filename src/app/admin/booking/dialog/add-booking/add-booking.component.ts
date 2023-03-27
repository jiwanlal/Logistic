import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, debounce, debounceTime, delay, distinctUntilChanged, exhaustMap, from, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BookingService } from '../../booking.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.sass']
})
export class AddBookingComponent {

  dialogtitle = "Add Booking"
  filteredAwbTypes: Observable<any[]>;
  awbTypes: any[] = new Array();
  offices: any[] = [];
  filteredOffice: Observable<any[]>;
  originPincodes: any[] = [];
  filteredOriginPincode: Observable<any[]>;

  destinationPincodes: any[] = [];
  filteredDestinationPincodes: Observable<any[]>;

  destinationLocalities: any[] = [];
  filteredDestinationLocalities: Observable<any[]>;

  destinationCities: any[] = [];
  filteredDestinationCities: Observable<any[]>;

  serviceModes: any[] = [];
  filteredServiceMode: Observable<any[]>;

  deliveryModes: any[] = [];
  filteredDeliveryModes: Observable<any[]>;

  paymentModes: any[] = [];
  filteredPaymentModes: Observable<any[]>;

  consingmentTypes: any[] = [];
  filteredConsingmentTypes: Observable<any[]>;

  consignorMobileNos: any[] = [];
  filteredConsignorMobileNos: Observable<any[]>;

  consignorCities: any[] = [];
  filteredConsignorCities: Observable<any[]>;

  consignorStates: any[] = [];
  filteredConsignorStates: Observable<any[]>;

  consigneeMobileNos: any[] = [];
  filteredConsigneeMobileNos: Observable<any[]>;

  consigneeCities: any[] = [];
  filteredConsigneeCities: Observable<any[]>;

  consigneeStates: any[] = [];
  filteredConsigneeStates: Observable<any[]>;

  gstRates: any[] = [];
  filteredGSTRates: Observable<any[]>;

  EnableConsignorTab = true;
  activeTab = 0;
  isPayemntModeDirect= false;


  constructor(private cdr: ChangeDetectorRef, public dialogRef: MatDialogRef<AddBookingComponent>, @Inject(MAT_DIALOG_DATA) public data, private bookService: BookingService) {



  }

  formdata = new FormGroup(
    {
      awb_id: new FormControl(null, [Validators.required]),
      awb_number: new FormControl(null, [Validators.required]),
      booking_office_id: new FormControl(null, [Validators.required]),
      booking_date: new FormControl(new Date(), [Validators.required]),
      origin_pincode_id: new FormControl(null, [Validators.required]),
      destination_pincode_id: new FormControl(null, [Validators.required]),
      destination_locality_id: new FormControl(null, [Validators.required]),
      destionation_city_id: new FormControl(null, [Validators.required]),
      service_mode_id: new FormControl(null, [Validators.required]),
      delivery_mode_id: new FormControl(null, [Validators.required]),
      no_of_packets: new FormControl(null, [Validators.required]),
      actual_weight: new FormControl(null, [Validators.required]),
      length: new FormControl(null, []),
      width: new FormControl(null, []),
      height: new FormControl(null, []),
      chargeable_weight: new FormControl(null, [Validators.required]),
      payment_mode_id: new FormControl(null, [Validators.required]),


    }
  )

  consignorForm = new FormGroup({
    consignor_mobile: new FormControl(null, []),
    consignor_name: new FormControl(null, []),
    consignor_address: new FormControl(null, []),
    consignor_city_id: new FormControl(null, []),
    consignor_state_id: new FormControl(null, []),
    consignee_mobile: new FormControl(null, []),
    consignee_name: new FormControl(null, []),
    consignee_address: new FormControl(null, []),
    consignee_city_id: new FormControl(null, []),
    consignee_state_id: new FormControl(null, []),
    gst_rate_id: new FormControl(null, []),
    gst_rate: new FormControl(null, []),
    amount: new FormControl(null, []),
    total_amount: new FormControl(null, []),
  })

  consingmentForm = new FormGroup({
    consignment_type_id: new FormControl(null, [Validators.required]),
    consignment_value: new FormControl(null, []),
    invoice_number: new FormControl(null, []),
    eway_bill_no: new FormControl(null, []),
    gst_number: new FormControl(null, [])
  })

  ngOnInit() {

    this.fillValues((fillDepenendnt) => {

      this.setSearchFilters();
      this.setDefaultValues();
    this.onConsignorFormEnable();

      this.loadData(fillDepenendnt);
    });

    this.onAWBNumberSelect();
    this.onOriginPincodeChange();
    this.OnPaymentModeChange();
    this.onDestinationPincodeSelect();
    this.diableControls();

    this.setChargeableWeight();
    this.onChargeableWeightChange();






  }

  private loadData(fillDepenendnt) {
    if (this.data) {

      this.formdata.controls.awb_id.setValue(this.data.awb_id, { emitEvent: false })
      this.formdata.controls.awb_number.setValue(this.data.awb_prefix, { emitEvent: false })
      this.formdata.controls.booking_office_id.setValue(this.data.booking_office_id)
      this.formdata.controls.booking_date.setValue(this.data.booking_date)
      this.formdata.controls.origin_pincode_id.setValue(this.data.origin_pincode_id, { emitEvent: false })
      this.formdata.controls.destination_pincode_id.setValue(this.data.destination_pincode_id, { emitEvent: false })
      this.formdata.controls.destination_locality_id.setValue(this.data.destination_locality_id)
      this.formdata.controls.destionation_city_id.setValue(this.data.destionation_city_id)
      this.formdata.controls.service_mode_id.setValue(this.data.service_mode_id)
      this.formdata.controls.delivery_mode_id.setValue(this.data.delivery_mode_id)
      this.formdata.controls.no_of_packets.setValue(this.data.no_of_packets)
      this.formdata.controls.actual_weight.setValue(this.data.actual_weight)
      this.formdata.controls.length.setValue(this.data.length)
      this.formdata.controls.width.setValue(this.data.width)
      this.formdata.controls.height.setValue(this.data.height)
      this.formdata.controls.chargeable_weight.setValue(this.data.chargeable_weight)
      this.formdata.controls.payment_mode_id.setValue(this.data.payment_mode_id)



      this.consingmentForm.controls.consignment_type_id.setValue(this.data.consignment_type_id)
      this.consingmentForm.controls.consignment_value.setValue(this.data.consignment_value)
      this.consingmentForm.controls.invoice_number.setValue(this.data.invoice_number)
      this.consingmentForm.controls.eway_bill_no.setValue(this.data.eway_bill_no)
      this.consingmentForm.controls.gst_number.setValue(this.data.gst_number)


      this.consignorForm.controls.consignor_mobile.setValue(this.data.consignor_mobile)
      this.consignorForm.controls.consignor_name.setValue(this.data.consignor_name)
      this.consignorForm.controls.consignor_address.setValue(this.data.consignor_address)
      this.consignorForm.controls.consignor_city_id.setValue(this.data.consignor_city_id)
      this.consignorForm.controls.consignor_state_id.setValue(this.data.consignor_state_id)
      this.consignorForm.controls.consignee_mobile.setValue(this.data.consignee_mobile)
      this.consignorForm.controls.consignee_name.setValue(this.data.consignee_name)
      this.consignorForm.controls.consignee_address.setValue(this.data.consignee_address)
      this.consignorForm.controls.consignee_city_id.setValue(this.data.consignee_city_id)
      this.consignorForm.controls.consignee_state_id.setValue(this.data.consignee_state_id)
      this.consignorForm.controls.gst_rate_id.setValue(this.data.gst_rate_id)
      this.consignorForm.controls.gst_rate.setValue(this.data.gst_rate)
      this.consignorForm.controls.amount.setValue(this.data.amount)
      this.consignorForm.controls.total_amount.setValue(this.data.total_amount)

    }
  }

  private fillValues(cb) {

    let d: Observable<any>[] = [];
    d.push(this.bookService.getFillValues(null))
    if (this.data) {
      d.push(this.bookService.getFillValues(this.data.booking_id))
    }

    combineLatest(d)
      .subscribe(res => {

        let fill = res[0];
        let fillDependent = res[1];

        this.serviceModes = fill?.data?.serviceMode || [];
        this.consingmentTypes = fill?.data?.consingmentTypes || [];
        this.paymentModes = fill?.data?.paymentModes || [];
        this.deliveryModes = fill?.data?.deliveryModes || [];
        this.gstRates = fill?.data?.gstRates || [];

        if (fillDependent) {
          this.originPincodes = fillDependent?.data?.originPinCode || [];
          this.offices = fillDependent?.data?.offices || [];
          this.destinationLocalities = fillDependent?.data?.localities || [];
          this.destinationCities = fillDependent?.data?.destinationCities || [];
          this.destinationPincodes = fillDependent?.data?.destinationPinCode || [];
          this.consigneeCities = fillDependent?.data?.consigneeCities || [];
          this.consigneeStates = fillDependent?.data?.consigneeStates || [];
          this.consignorCities = fillDependent?.data?.consignoreCities || [];
          this.consignorStates = fillDependent?.data?.consignoreStates || [];
        }

        setTimeout(() => {
          cb(fillDependent);
        }, 20);

      })
    // this.bookService.getFillValues(null)
    //   .subscribe(fill => {



    //   })
  }

  private setChargeableWeight() {
    /// set Chargable weight
    this.formdata.controls.actual_weight.valueChanges
      .subscribe(val => {
        let control = this.formdata.controls;

        if (!(control.height.value && control.width.value && control.length.value)) {
          this.formdata.controls.chargeable_weight.setValue(val);
        }
      })

    combineLatest([
      this.formdata.controls.height.valueChanges,
      this.formdata.controls.width.valueChanges,
      this.formdata.controls.length.valueChanges,
    ])
      .subscribe(res => {
        let val = parseFloat(((res[0] * res[1] * res[2]) / 5000).toFixed(2))
        this.formdata.controls.chargeable_weight.setValue(val)
      })
  }

  private onChargeableWeightChange() {
    this.formdata.controls.chargeable_weight.valueChanges
      .subscribe(val => {

        let consingment = this.consingmentTypes.find(x => val >= x.FromWeight && val <= x.ToWeight);

        if (consingment)
          this.consingmentForm.controls.consignment_type_id.setValue(consingment.Id)
      })
  }
  private diableControls() {

    this.formdata.controls.booking_office_id.disable();
    this.formdata.controls.origin_pincode_id.disable();
    this.formdata.controls.payment_mode_id.disable();
  }

  private onAWBNumberSelect() {

    this.formdata.controls.awb_number.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        exhaustMap(value => {
          return this.bookService.searchAWBNumber(value).pipe(map(y => ({ inputValue: value, data: this._translateApiToProperty(y) })))
        })
      ).subscribe(res => {
        this.awbTypes = res.data;
        this.formdata.controls.awb_id.setValue(null);
        let selectedAWb = this.awbTypes?.find(x => x.AwbPrefix == res.inputValue)
        if (selectedAWb) {
          this.formdata.controls.awb_id.setValue(selectedAWb.AwbId);
          this.formdata.controls.payment_mode_id.setValue(selectedAWb?.PaymentModeId);
          this.bookService.getOfficeById(selectedAWb.OfficeId).subscribe(res => {
            this.offices = res.data;
            setTimeout(() => {
              this.formdata.controls.booking_office_id.setValue(selectedAWb.OfficeId);
            }, 20);


            this.bookService.getPincodeById(this.offices[0]?.post_code_id).subscribe(pin => {
              this.originPincodes = pin.data;
              setTimeout(() => {
                this.formdata.controls.origin_pincode_id.setValue(this.offices[0]?.post_code_id);
              }, 20);
            })
          })



        }
        this.formdata.controls.awb_id.markAsTouched();

      })




  }

  private onOriginPincodeChange() {

    this.formdata.controls.origin_pincode_id.valueChanges
      .pipe(
        switchMap(x => {
          return this.bookService.getPincodeById(x);
        })
      )
      .subscribe(value => {

        // set consignor state and city

        let cityId = value?.data[0]?.CityId;
        let stateId = value?.data[0]?.StateId
        combineLatest([
          this.bookService.getCityById(cityId),
          this.bookService.getStateById(stateId)
        ])
          .subscribe(res => {


            this.consignorCities = res[0]?.data?.map(x => {
              x.Id = x.city_id
              x.Name = x.city_name;

              return x;
            });
            this.consignorStates = res[1]?.data;

            this.consignorForm.controls.consignor_city_id.setValue(cityId);
            this.consignorForm.controls.consignor_state_id.setValue(stateId);
            this.cdr.detectChanges();

          })



      })
  }
 

  private OnPaymentModeChange() {
    this.formdata.controls.payment_mode_id.valueChanges.subscribe(value => {
      if (value == 1 ) {
        //return this.onConsignorFormEnable();
        this.isPayemntModeDirect = true;
      }
      //this.onConsignorFormDisable();
    })
  }

  private onDestinationPincodeSelect() {
    this.formdata.controls.destination_pincode_id.valueChanges
      .subscribe(value => {

        let pincode = this.destinationPincodes.find(x => x.Id == value);
        if (pincode) {
          this.bookService.getLocalitiesOnPostCode(value).subscribe(local => {
            this.destinationLocalities = local?.data || [];
            this.filteredDestinationLocalities = this.formdata.controls.destination_locality_id.valueChanges.pipe(
              startWith(''),
              map(value => {
                value = typeof (value) == 'string' ? value?.toLowerCase() : ''
                return this.destinationLocalities.filter(option => option?.LocalityName?.toLowerCase().includes(value?.toLowerCase()));
              }),
            );
            this.formdata.controls.destination_locality_id.setValue(this.destinationLocalities[0].Id);
            this.cdr.detectChanges();

          })

          combineLatest([
            this.bookService.getCityById(pincode?.CityId),
            this.bookService.getStateById(pincode?.StateId)
          ])
            .subscribe(res => {


              this.consigneeCities = res[0]?.data?.map(x => {
                x.Id = x.city_id
                x.Name = x.city_name;

                return x;
              });
              this.consigneeStates = res[1]?.data || [];
              this.destinationCities = res[0]?.data || [];
              this.filteredDestinationCities = this.formdata.controls.destionation_city_id.valueChanges.pipe(
                startWith(''),
                map(value => {
                  value = typeof (value) == 'string' ? value?.toLowerCase() : ''
                  return this.destinationCities.filter(option => option?.city_name?.toLowerCase().includes(value?.toLowerCase()));
                }),
              );

              setTimeout(() => {
                this.formdata.controls.destionation_city_id.setValue(this.destinationCities[0].city_id)
                this.consignorForm.controls.consignee_city_id.setValue(pincode?.CityId);
                this.consignorForm.controls.consignee_state_id.setValue(pincode?.StateId);
              }, 200);
             
              //this.cdr.detectChanges();

            })
        }


      })
  }

  private setDefaultValues() {

    this.formdata.controls.delivery_mode_id.setValue(this.deliveryModes[0].Id)
    this.formdata.controls.service_mode_id.setValue(this.serviceModes[0].Id)
  }

  private onConsignorFormEnable() {

    this.EnableConsignorTab = true;
    // setting search filters
    this.filteredGSTRates = this.consignorForm.controls.gst_rate_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.gstRates.filter(option => option?.Name?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );


    this.filteredConsignorMobileNos = this.consignorForm.controls.consignor_mobile.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.awbTypes) : this.bookService.searchAWBNumber(x).pipe(map(y => this.consignorMobileNos = this._translateApiToProperty(y))))
      }
      )
    )


    this.filteredConsignorCities = this.consignorForm.controls.consignor_city_id.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.consignorCities) : this.bookService.searchCities(x).pipe(map(y => this.consignorCities = this._translateApiToProperty(y))))
      }
      )
    )

    this.filteredConsigneeCities = this.consignorForm.controls.consignee_city_id.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.consigneeCities) : this.bookService.searchCities(x).pipe(map(y => this.consigneeCities = this._translateApiToProperty(y))))
      }
      )
    )

    this.filteredConsignorStates = this.consignorForm.controls.consignor_state_id.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.consignorStates) : this.bookService.searchStates(x).pipe(map(y => this.consignorStates = this._translateApiToProperty(y))))
      }
      )
    )

    this.filteredConsigneeStates = this.consignorForm.controls.consignee_state_id.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.consigneeStates) : this.bookService.searchStates(x).pipe(map(y => this.consigneeStates = this._translateApiToProperty(y))))
      }
      )
    )

    this.filteredConsingmentTypes = this.consingmentForm.controls.consignment_type_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.consingmentTypes.filter(option => option?.ConsingmentType?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    //===================================


    merge(this.consignorForm.controls.amount.valueChanges, this.consignorForm.controls.gst_rate_id.valueChanges)
      .subscribe(val => {
        let form = this.consignorForm.controls;
        if (form?.amount?.value) {
          form.total_amount.setValue(parseFloat(form.amount.value));
          if (form?.gst_rate_id?.value) {
            let gst = this.gstRates.find(x => x.Id == form.gst_rate_id.value);
            if (gst) {
              form.gst_rate.setValue(parseFloat(gst.Rate));
              let tax = parseFloat(form.amount.value) * parseFloat(gst.Rate) * 0.01;
              form.total_amount.setValue(parseFloat(form.amount.value) + tax);
            }
          }
        }

      })

  }

  private onConsignorFormDisable() {
    this.EnableConsignorTab = false;
  }



  setSearchFilters() {

    this.filteredAwbTypes = this.formdata.controls.awb_number.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.awbTypes) : this.bookService.searchAWBNumber(x).pipe(map(y => this.awbTypes = this._translateApiToProperty(y))))
      }
      )
    )

    this.filteredDestinationPincodes = this.formdata.controls.destination_pincode_id.valueChanges.pipe(
      exhaustMap(x => {
        return ((typeof (x) == 'number') ? of(this.destinationPincodes) : this.bookService.searchPincode(x).pipe(map(y => this.destinationPincodes = this._translateApiToProperty(y))))
      }
      )
    )




    this.filteredDeliveryModes = this.formdata.controls.delivery_mode_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.deliveryModes.filter(option => option?.DeliveryMode?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    this.filteredPaymentModes = this.formdata.controls.payment_mode_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.paymentModes.filter(option => option?.PaymentMode?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    this.filteredServiceMode = this.formdata.controls.service_mode_id.valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof (value) == 'string' ? value?.toLowerCase() : ''
        return this.serviceModes.filter(option => option?.ServiceMode?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );



  }

  private _translateApiToProperty(value) {
    return value?.data || [];
  }

  displayFunc(list, key, displaykey, value): string {
    if (typeof (value) == 'number') {
      value = list.find(x => x?.[key]?.toString()?.indexOf(value) != -1)
    }
    return value?.[displaykey];
  }

  close() {

    this.dialogRef.close();
  }

  onSubmit() {


    if (this.formdata.invalid) {
      this.formdata.markAllAsTouched();
      return this.activeTab = 0;
    }
    if (this.consignorForm.invalid && this.EnableConsignorTab) {
      this.consignorForm.markAllAsTouched();
      return this.activeTab = 1;
    }
    if (this.consingmentForm.invalid) {
      this.consingmentForm.markAllAsTouched();
      return this.activeTab = 2;
    }

    let val = { ...this.formdata.getRawValue(), ... this.consignorForm.getRawValue(), ... this.consingmentForm.getRawValue() };


    this.bookService.CreateBooking(val, this.data?.booking_id).subscribe(res => {

      if (res.success) {
        setTimeout(() => {
          this.dialogRef.close(true)
        }, 400);
      }
    })


  }


}
