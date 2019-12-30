(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mguide-mguide-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/mguide/mguide.component.html":
/*!******************************************************************************************************************!*\
  !*** /home/angeloacr/Proyectos/PanaDoc/PanadocNx/node_modules/raw-loader!./src/app/mguide/mguide.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group mat-stretch-tabs backgroundColor=\"primary\" color=\"accent\" id='mguide'>\n  <mat-tab label=\"Nueva Cita\" fxLayout=\"column\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"16px\"\n    *ngIf=\"!isDoctor\">\n    <div class=\"loading-shade\" *ngIf=\"($loading | async)\">\n      <mat-spinner></mat-spinner>\n    </div>\n\n    <mat-card id=\"search-bar\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"16px\">\n\n      <mat-form-field fxFlex=\"95%\" fxFlexFill>\n        <input matInput [(ngModel)]=\"searchValue\" placeholder=\"Buscar Doctor por especialidad\">\n      </mat-form-field>\n      <button mat-icon-button (click)=\"search()\">\n        <mat-icon matPrefix>search</mat-icon>\n      </button>\n    </mat-card>\n\n    <ui-card-doctor *ngFor=\"let doctor of $doctorList | async as list\" [doctor]=\"doctor\"\n      (appointment)=\"scheduleAppointment($event)\" (newReview)=\"newReview($event)\" (redirect)=\"moreInfo($event)\">\n    </ui-card-doctor>\n  </mat-tab>\n  <mat-tab label=\"Citas Programadas\" style.height=\"100%\">\n    <div class=\"loading-shade\" *ngIf=\"($loading | async)\">\n      <mat-spinner></mat-spinner>\n    </div>\n\n    <ng-container *ngIf=\"appointments.length; else noAppointments\">\n      <ui-card-appointment *ngFor=\"let appointment of appointments\" [appointment]=\"appointment\" [patient]=\"user\"\n        (canceled)=\"cancelAppointment($event)\" (rescheduled)=\"reschedule($event)\">\n      </ui-card-appointment>\n    </ng-container>\n    <ng-template #noAppointments>\n      <h4>No tiene citas medicas agendadas.</h4>\n    </ng-template>\n\n  </mat-tab>\n</mat-tab-group>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/mguide/new-appointment/new-appointment.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** /home/angeloacr/Proyectos/PanaDoc/PanadocNx/node_modules/raw-loader!./src/app/mguide/new-appointment/new-appointment.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card-schedule-appointment\">\n  <mat-card-header>\n    <mat-card-title>{{isNewAppointment?'Programar Cita':'Reprogramar Cita'}}</mat-card-title>\n  </mat-card-header>\n  <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"space-around center\" fxLayoutGap=\"16px\">\n    <div class=\"loading-shade\" *ngIf=\"($loading | async)\">\n      <mat-spinner></mat-spinner>\n    </div>\n\n    <mat-form-field class=\" symptoms-chip-list chip-list\" *ngIf=\"isNewAppointment\">\n      <mat-chip-list #chipList aria-label=\"Que sintomas presenta\">\n        <mat-chip *ngFor=\"let s of symptoms\" [selectable]=\"true\" [removable]=\"true\" (removed)=\"remove(s)\">\n          {{s}}\n          <mat-icon matChipRemove>cancel</mat-icon>\n        </mat-chip>\n        <input placeholder=\"Nuevo sintoma\" #symptomInput [formControl]=\"symptomCtrl\" [matAutocomplete]=\"auto\"\n          [matChipInputFor]=\"chipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n          [matChipInputAddOnBlur]=\"addOnBlur\" (matChipInputTokenEnd)=\"add($event)\">\n      </mat-chip-list>\n      <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"selected($event)\">\n        <mat-option *ngFor=\"let symp of filteredSymptoms | async\" [value]=\"symp\">\n          {{symp}}\n        </mat-option>\n      </mat-autocomplete>\n    </mat-form-field>\n    <!-- <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"16px\"> -->\n    <mat-form-field class=\"example-full-width\" fxFlex=\"50%\" fxFlexFill>\n      <input matInput [matDatepicker]=\"datePicker\" placeholder=\"Elegir Fecha\" [formControl]=\"date\">\n      <mat-datepicker-toggle matSuffix [for]=\"datePicker\"></mat-datepicker-toggle>\n      <mat-datepicker #datePicker></mat-datepicker>\n    </mat-form-field>\n    <mat-form-field fxFlex=\"50%\" fxFlexFill>\n      <mat-label>Elegir Hora</mat-label>\n      <input matInput [ngxTimepicker]=\"timePicker\" placeholder=\"Elegir Hora\">\n      <ngx-material-timepicker #timePicker [minutesGap]=\"15\" (timeSet)=\"changeTime($event)\">\n      </ngx-material-timepicker>\n    </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-button (click)=\"goBack()\">Cancelar\n      {{isNewAppointment?'cita':'reprogramacion'}}</button>\n    <button [disabled]='!isValid' mat-button (click)=\"cta($event)\">{{isNewAppointment?'Agendar':'Reprogramar'}}\n      cita</button>\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/mguide/mguide.component.scss":
/*!**********************************************!*\
  !*** ./src/app/mguide/mguide.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#mguide #search-bar {\n  padding: 0px 24px;\n}\n#mguide .mat-tab-body-content {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZ2Vsb2Fjci9Qcm95ZWN0b3MvUGFuYURvYy9QYW5hZG9jTngvYXBwcy9wYW5hZG9jL3NyYy9hcHAvbWd1aWRlL21ndWlkZS5jb21wb25lbnQuc2NzcyIsImFwcHMvcGFuYWRvYy9zcmMvYXBwL21ndWlkZS9tZ3VpZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxpQkFBQTtBQ0FKO0FERUU7RUFDRSxZQUFBO0FDQUoiLCJmaWxlIjoiYXBwcy9wYW5hZG9jL3NyYy9hcHAvbWd1aWRlL21ndWlkZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNtZ3VpZGV7XG4gICNzZWFyY2gtYmFyIHtcbiAgICBwYWRkaW5nOiAwcHggMjRweDtcbiAgfVxuICAubWF0LXRhYi1ib2R5LWNvbnRlbnR7XG4gICAgaGVpZ2h0OjEwMCU7XG5cbiAgfVxufSIsIiNtZ3VpZGUgI3NlYXJjaC1iYXIge1xuICBwYWRkaW5nOiAwcHggMjRweDtcbn1cbiNtZ3VpZGUgLm1hdC10YWItYm9keS1jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/mguide/mguide.component.ts":
/*!********************************************!*\
  !*** ./src/app/mguide/mguide.component.ts ***!
  \********************************************/
/*! exports provided: MguideComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MguideComponent", function() { return MguideComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers */ "./src/app/reducers/index.ts");
/* harmony import */ var _panadoc_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @panadoc/data */ "../../libs/data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _mguide_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mguide.service */ "./src/app/mguide/mguide.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");









var MguideComponent = /** @class */ (function () {
    function MguideComponent(store, http, route, router) {
        this.store = store;
        this.http = http;
        this.route = route;
        this.router = router;
        this.$loading = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(false);
        this.searchValue = '';
        this.appointments = [];
    }
    MguideComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$loading = this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_3__["loadingSelector"]);
        this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])('auth')).subscribe(function (user) {
            _this.isDoctor = Object(_panadoc_data__WEBPACK_IMPORTED_MODULE_4__["determineIfUserIsDoctor"])(user);
            _this.user = user;
            if ([_panadoc_data__WEBPACK_IMPORTED_MODULE_4__["UserType"].DOCTOR, _panadoc_data__WEBPACK_IMPORTED_MODULE_4__["UserType"].PATIENT].some(function (f) { return f === user.type; })) {
                //@ts-ignore
                _this.appointments = user.appointments;
            }
            _this.http.token = user.token;
        });
        this.search();
    };
    MguideComponent.prototype.search = function () {
        this.$doctorList = this.http.getDoctors(this.searchValue).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (s) { return s; }));
    };
    MguideComponent.prototype.reschedule = function (appointment) {
        this.router.navigate(["/agenda/reagendar-cita/" + appointment.uid]);
        //TODO: Retorna a pantalla de citas programadas despues de hacer la llamada
    };
    MguideComponent.prototype.cancelAppointment = function (appointment) {
        this.http.deleteAppointment(appointment.uid).subscribe(function (v) { return console.log(v); });
    };
    MguideComponent.prototype.scheduleAppointment = function (doctor) {
        this.router.navigate(["/agenda/nueva-cita/" + doctor.uid]);
    };
    MguideComponent.prototype.newReview = function (review) {
        this.http.postReview(review).subscribe(function (v) { return console.log(v); });
    };
    MguideComponent.prototype.moreInfo = function (doctorId) {
        this.router.navigate(["/doctor/" + doctorId]);
    };
    MguideComponent.ctorParameters = function () { return [
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] },
        { type: _mguide_service__WEBPACK_IMPORTED_MODULE_6__["MguideService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] }
    ]; };
    MguideComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./mguide.component.html */ "../../node_modules/raw-loader/index.js!./src/app/mguide/mguide.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./mguide.component.scss */ "./src/app/mguide/mguide.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _mguide_service__WEBPACK_IMPORTED_MODULE_6__["MguideService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]])
    ], MguideComponent);
    return MguideComponent;
}());



/***/ }),

/***/ "./src/app/mguide/mguide.module.ts":
/*!*****************************************!*\
  !*** ./src/app/mguide/mguide.module.ts ***!
  \*****************************************/
/*! exports provided: MguideModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MguideModule", function() { return MguideModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_material_timepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-material-timepicker */ "../../node_modules/ngx-material-timepicker/fesm5/ngx-material-timepicker.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "../../node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var libs_ui_src_lib_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/ui/src/lib/material.module */ "../../libs/ui/src/lib/material.module.ts");
/* harmony import */ var _panadoc_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @panadoc/ui */ "../../libs/ui/src/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _new_appointment_new_appointment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./new-appointment/new-appointment.component */ "./src/app/mguide/new-appointment/new-appointment.component.ts");
/* harmony import */ var _mguide_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mguide.component */ "./src/app/mguide/mguide.component.ts");











var MguideModule = /** @class */ (function () {
    function MguideModule() {
    }
    MguideModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _new_appointment_new_appointment_component__WEBPACK_IMPORTED_MODULE_9__["NewAppointmentComponent"],
                _mguide_component__WEBPACK_IMPORTED_MODULE_10__["MguideComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild([
                    { path: '', component: _mguide_component__WEBPACK_IMPORTED_MODULE_10__["MguideComponent"] },
                    { path: 'nueva-cita/:doctorId', component: _new_appointment_new_appointment_component__WEBPACK_IMPORTED_MODULE_9__["NewAppointmentComponent"] },
                    { path: 'reagendar-cita/:appointmentId', component: _new_appointment_new_appointment_component__WEBPACK_IMPORTED_MODULE_9__["NewAppointmentComponent"] },
                ]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                libs_ui_src_lib_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"],
                ngx_material_timepicker__WEBPACK_IMPORTED_MODULE_3__["NgxMaterialTimepickerModule"].setLocale('es-VE'),
                _panadoc_ui__WEBPACK_IMPORTED_MODULE_6__["UiModule"],
            ]
        })
    ], MguideModule);
    return MguideModule;
}());



/***/ }),

/***/ "./src/app/mguide/new-appointment/new-appointment.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/mguide/new-appointment/new-appointment.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-schedule-appointment mat-card-content {\n  padding: 1rem 3rem;\n}\n.card-schedule-appointment mat-card-content .chip-list {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZ2Vsb2Fjci9Qcm95ZWN0b3MvUGFuYURvYy9QYW5hZG9jTngvYXBwcy9wYW5hZG9jL3NyYy9hcHAvbWd1aWRlL25ldy1hcHBvaW50bWVudC9uZXctYXBwb2ludG1lbnQuY29tcG9uZW50LnNjc3MiLCJhcHBzL3BhbmFkb2Mvc3JjL2FwcC9tZ3VpZGUvbmV3LWFwcG9pbnRtZW50L25ldy1hcHBvaW50bWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLGtCQUFBO0FDQUo7QURFSTtFQUNFLFdBQUE7QUNBTiIsImZpbGUiOiJhcHBzL3BhbmFkb2Mvc3JjL2FwcC9tZ3VpZGUvbmV3LWFwcG9pbnRtZW50L25ldy1hcHBvaW50bWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkLXNjaGVkdWxlLWFwcG9pbnRtZW50IHtcbiAgbWF0LWNhcmQtY29udGVudCB7XG4gICAgcGFkZGluZzogMXJlbSAzcmVtO1xuXG4gICAgLmNoaXAtbGlzdCB7XG4gICAgICB3aWR0aDogMTAwJVxuICAgIH1cbiAgfVxufSIsIi5jYXJkLXNjaGVkdWxlLWFwcG9pbnRtZW50IG1hdC1jYXJkLWNvbnRlbnQge1xuICBwYWRkaW5nOiAxcmVtIDNyZW07XG59XG4uY2FyZC1zY2hlZHVsZS1hcHBvaW50bWVudCBtYXQtY2FyZC1jb250ZW50IC5jaGlwLWxpc3Qge1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/mguide/new-appointment/new-appointment.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/mguide/new-appointment/new-appointment.component.ts ***!
  \*********************************************************************/
/*! exports provided: NewAppointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewAppointmentComponent", function() { return NewAppointmentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _mguide_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mguide.service */ "./src/app/mguide/mguide.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/keycodes */ "../../node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/autocomplete */ "../../node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");










var NewAppointmentComponent = /** @class */ (function () {
    function NewAppointmentComponent(route, router, http, store) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.http = http;
        this.store = store;
        this.isNewAppointment = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["ENTER"], _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["COMMA"]];
        this.symptomCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.$loading = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(false);
        this.allSymptoms = [];
        this.symptoms = [];
        this.date = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](new Date());
        this.hour = new Date();
        this.isValid = false;
        this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_9__["select"])('auth')).subscribe(function (auth) {
            _this.http.token = auth.token;
        });
        this.filteredSymptoms = this.symptomCtrl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (symp) { return symp ? _this._filter(symp) : _this.allSymptoms.slice(); }));
    }
    NewAppointmentComponent.prototype.changeTime = function (newTime) {
        this.hour = new Date(); //newTime;
        this.isValid = true;
    };
    NewAppointmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getSymptoms().subscribe(function (s) {
            _this.allSymptoms = s;
        });
        this.route.paramMap.subscribe(function (params) {
            if (params.has('doctorId')) {
                _this.isNewAppointment = true;
                var doctorId = params.get('doctorId');
            }
            if (params.has('appointmentId')) {
                _this.isNewAppointment = false;
                var doctorId = params.get('appointmentId');
            }
        });
    };
    NewAppointmentComponent.prototype.cta = function (data) {
        var _this = this;
        //TODO: Improve sending data;
        if (this.isNewAppointment) {
            this.http
                .postAppointment({ hour: this.hour, symptoms: this.symptoms, date: this.date.value })
                .subscribe(function (v) { return console.log(v); });
        }
        else {
            // this.http.putAppointment(this.appointment, { hour: this.hour, date: this.date.value })
            //   .subscribe(v => console.log(v));
        }
        var newSymptoms = this.symptoms.filter(function (f) { return !_this.allSymptoms.includes(f); });
        if (newSymptoms.length > 0)
            this.http.postSymptoms(newSymptoms).subscribe(function (v) { return console.log(v); });
        this.goBack();
    };
    NewAppointmentComponent.prototype.goBack = function () {
        this.router.navigateByUrl('/agenda');
    };
    NewAppointmentComponent.prototype.add = function (event) {
        if (!this.matAutocomplete.isOpen) {
            var input = event.input;
            var value = event.value;
            if ((value || '').trim()) {
                this.symptoms.push(value.trim());
            }
            if (input) {
                input.value = '';
            }
            this.symptomCtrl.setValue(null);
        }
    };
    NewAppointmentComponent.prototype.remove = function (symptom) {
        var index = this.symptoms.indexOf(symptom);
        if (index >= 0) {
            this.symptoms.splice(index, 1);
        }
    };
    NewAppointmentComponent.prototype.selected = function (event) {
        this.symptoms.push(event.option.viewValue);
        this.symptomInput.nativeElement.value = '';
        this.symptomCtrl.setValue(null);
    };
    NewAppointmentComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.allSymptoms.filter(function (symp) { return symp.toLowerCase().indexOf(filterValue) === 0; });
    };
    NewAppointmentComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _mguide_service__WEBPACK_IMPORTED_MODULE_3__["MguideService"] },
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('symptomInput', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], NewAppointmentComponent.prototype, "symptomInput", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('auto', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_7__["MatAutocomplete"])
    ], NewAppointmentComponent.prototype, "matAutocomplete", void 0);
    NewAppointmentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./new-appointment.component.html */ "../../node_modules/raw-loader/index.js!./src/app/mguide/new-appointment/new-appointment.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./new-appointment.component.scss */ "./src/app/mguide/new-appointment/new-appointment.component.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _mguide_service__WEBPACK_IMPORTED_MODULE_3__["MguideService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"]])
    ], NewAppointmentComponent);
    return NewAppointmentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=mguide-mguide-module.js.map