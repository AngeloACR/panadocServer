(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ask-adoc-ask-adoc-module"],{

/***/ "../../node_modules/ngx-wig/fesm5/ngx-wig.js":
/*!*****************************************************************************************!*\
  !*** /home/angeloacr/Proyectos/PanaDoc/PanadocNx/node_modules/ngx-wig/fesm5/ngx-wig.js ***!
  \*****************************************************************************************/
/*! exports provided: BUTTONS, CUSTOM_LIBRARY_BUTTONS, DEFAULT_LIBRARY_BUTTONS, NgxWigComponent, NgxWigModule, NgxWigToolbarService, getWindowObject, provideButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUTTONS", function() { return BUTTONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOM_LIBRARY_BUTTONS", function() { return CUSTOM_LIBRARY_BUTTONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LIBRARY_BUTTONS", function() { return DEFAULT_LIBRARY_BUTTONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxWigComponent", function() { return NgxWigComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxWigModule", function() { return NgxWigModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxWigToolbarService", function() { return NgxWigToolbarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWindowObject", function() { return getWindowObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provideButtons", function() { return provideButtons; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_LIBRARY_BUTTONS = {
    list1: {
        label: 'UL',
        title: 'Unordered List',
        command: 'insertunorderedlist',
        styleClass: 'list-ul',
        icon: 'icon-list-ul'
    },
    list2: {
        label: 'OL',
        title: 'Ordered List',
        command: 'insertorderedlist',
        styleClass: 'list-ol',
        icon: 'icon-list-ol'
    },
    bold: {
        label: 'B',
        title: 'Bold',
        command: 'bold',
        styleClass: 'bold',
        icon: 'icon-bold'
    },
    italic: {
        label: 'I',
        title: 'Italic',
        command: 'italic',
        styleClass: 'italic',
        icon: 'icon-italic'
    },
    link: {
        label: 'Link',
        title: 'Link',
        command: 'createlink',
        styleClass: 'link',
        icon: 'icon-link'
    },
    underline: {
        label: 'U',
        title: 'Underline',
        command: 'underline',
        styleClass: 'format-underlined',
        icon: 'icon-underline'
    }
};
/** @type {?} */
var CUSTOM_LIBRARY_BUTTONS = {
    edithtml: {
        label: 'Edit HTML',
        title: 'Edit HTML',
        command: (/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            ctx.editMode = !ctx.editMode;
        }),
        styleClass: 'nw-button--source',
        icon: '',
    }
};
/** @type {?} */
var BUTTONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('BUTTONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxWigToolbarService = /** @class */ (function () {
    function NgxWigToolbarService(buttonLibraryConfig) {
        this._defaultButtonsList = [];
        this._buttonLibrary = buttonLibraryConfig.reduce((/**
         * @param {?} acc
         * @param {?} val
         * @return {?}
         */
        function (acc, val) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, val)); }), {});
        this._defaultButtonsList = Object.keys(this._buttonLibrary);
    }
    /**
     * @param {?} buttons
     * @return {?}
     */
    NgxWigToolbarService.prototype.setButtons = /**
     * @param {?} buttons
     * @return {?}
     */
    function (buttons) {
        if (!Array.isArray(buttons)) {
            throw new Error('Argument "buttons" should be an array');
        }
        this._defaultButtonsList = buttons;
    };
    /**
     * @param {?} name
     * @param {?} title
     * @param {?} command
     * @param {?} styleClass
     * @param {?} icon
     * @return {?}
     */
    NgxWigToolbarService.prototype.addStandardButton = /**
     * @param {?} name
     * @param {?} title
     * @param {?} command
     * @param {?} styleClass
     * @param {?} icon
     * @return {?}
     */
    function (name, title, command, styleClass, icon) {
        if (!name || !title || !command) {
            throw new Error('Arguments "name", "title" and "command" are required');
        }
        styleClass = styleClass || '';
        this._buttonLibrary[name] = { title: title, command: command, styleClass: styleClass, icon: icon };
        this._defaultButtonsList.push(name);
    };
    /**
     * @param {?=} buttonsList
     * @return {?}
     */
    NgxWigToolbarService.prototype.getToolbarButtons = /**
     * @param {?=} buttonsList
     * @return {?}
     */
    function (buttonsList) {
        var _this = this;
        /** @type {?} */
        var buttons = this._defaultButtonsList;
        /** @type {?} */
        var toolbarButtons = [];
        if (typeof buttonsList !== 'undefined') {
            buttons = string2array(buttonsList);
        }
        buttons.forEach((/**
         * @param {?} buttonKey
         * @return {?}
         */
        function (buttonKey) {
            if (!buttonKey) {
                return;
            }
            if (!_this._buttonLibrary[buttonKey]) {
                throw new Error("There is no \"" + buttonKey + "\" in your library. Possible variants: " + Object.keys(_this._buttonLibrary));
            }
            /** @type {?} */
            var button = Object.assign({}, _this._buttonLibrary[buttonKey]);
            // button.isActive = () => {return !!this.command && document.queryCommandState(this.command);}
            toolbarButtons.push(button);
        }));
        return toolbarButtons;
    };
    NgxWigToolbarService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxWigToolbarService.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [BUTTONS,] }] }
    ]; };
    /** @nocollapse */ NgxWigToolbarService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function NgxWigToolbarService_Factory() { return new NgxWigToolbarService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"])(BUTTONS)); }, token: NgxWigToolbarService, providedIn: "root" });
    return NgxWigToolbarService;
}());
/**
 * @param {?} keysString
 * @return {?}
 */
function string2array(keysString) {
    return keysString
        .split(',')
        .map(Function.prototype.call, String.prototype.trim);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@dynamic
 */
var NgxWigComponent = /** @class */ (function () {
    function NgxWigComponent(_ngWigToolbarService, document, // cannot set Document here - Angular issue - https://github.com/angular/angular/issues/20351
    window) {
        this._ngWigToolbarService = _ngWigToolbarService;
        this.document = document;
        this.window = window;
        this.contentChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.editMode = false;
        this.toolbarButtons = [];
        this.hasFocus = false;
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.propagateTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} command
     * @param {?=} options
     * @return {?}
     */
    NgxWigComponent.prototype.execCommand = /**
     * @param {?} command
     * @param {?=} options
     * @return {?}
     */
    function (command, options) {
        if (typeof command === 'function') {
            command(this);
            return true;
        }
        if (this.editMode) {
            return false;
        }
        if (this.document.queryCommandSupported && !this.document.queryCommandSupported(command)) {
            throw new Error("The command \"" + command + "\" is not supported");
        }
        if (command === 'createlink' || command === 'insertImage') {
            options = window.prompt('Please enter the URL', 'http://') || '';
            if (!options) {
                return false;
            }
        }
        this.container.focus();
        // use insertHtml for `createlink` command to account for IE/Edge purposes, in case there is no selection
        /** @type {?} */
        var selection = this.document.getSelection().toString();
        if (command === 'createlink' && selection === '') {
            this.document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
        }
        else {
            this.document.execCommand(command, false, options);
        }
        this.onContentChange(this.container.innerHTML);
        return true;
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.toolbarButtons = this._ngWigToolbarService.getToolbarButtons(this.buttons);
        this.container = this.ngxWigEditable.nativeElement;
        if (this.content) {
            this.container.innerHTML = this.content;
        }
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // Workaround for IE11 which doesn't fire 'input' event on
        // contenteditable
        // https://stackoverflow.com/a/49287032/7369511
        var _this = this;
        // check if the browser is IE:
        if (window.document['documentMode']) {
            this._mutationObserver = new MutationObserver((/**
             * @return {?}
             */
            function () {
                _this.onContentChange(_this.container.innerHTML);
            }));
            this._mutationObserver.observe(this.container, { childList: true, subtree: true, characterData: true });
        }
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
        }
    };
    /**
     * @param {?} newContent
     * @return {?}
     */
    NgxWigComponent.prototype.onContentChange = /**
     * @param {?} newContent
     * @return {?}
     */
    function (newContent) {
        this.content = newContent;
        this.contentChange.emit(this.content);
        this.propagateChange(this.content);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxWigComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.container && changes['content']) {
            // clear the previous content
            this.container.innerHTML = '';
            // add the new content
            this.pasteHtmlAtCaret(changes['content'].currentValue);
        }
    };
    /**
     * @param {?} newContent
     * @return {?}
     */
    NgxWigComponent.prototype.onTextareaChange = /**
     * @param {?} newContent
     * @return {?}
     */
    function (newContent) {
        // model -> view
        this.container.innerHTML = newContent;
        this.onContentChange(newContent);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxWigComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            value = '';
        }
        this.container.innerHTML = value;
        this.onContentChange(value);
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.shouldShowPlaceholder = /**
     * @return {?}
     */
    function () {
        return !!this.placeholder
            && !this.container.innerText;
    };
    /**
     * @private
     * @param {?} html
     * @return {?}
     */
    NgxWigComponent.prototype.pasteHtmlAtCaret = /**
     * @private
     * @param {?} html
     * @return {?}
     */
    function (html) {
        /** @type {?} */
        var sel;
        /** @type {?} */
        var range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // append the content in a temporary div
                /** @type {?} */
                var el = this.document.createElement('div');
                el.innerHTML = html;
                /** @type {?} */
                var frag = this.document.createDocumentFragment();
                /** @type {?} */
                var node = void 0;
                /** @type {?} */
                var lastNode = void 0;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxWigComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxWigComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateTouched = fn;
    };
    /**
     * @return {?}
     */
    NgxWigComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
        this.propagateTouched();
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxWigComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    NgxWigComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ngx-wig',
                    template: "<div class=\"ng-wig\">\n    <ul class=\"nw-toolbar\">\n      <li *ngFor=\"let button of toolbarButtons\"\n          class=\"nw-toolbar__item\">\n        <div>\n          <button type=\"button\"\n                  class=\"nw-button\"\n                  [ngClass]=\"[button.styleClass]\"\n                  [title]=\"button.title\"\n                  (click)=\"execCommand(button.command)\"\n                  [disabled]=\"disabled\"\n                  tabindex=\"-1\">\n            <ng-container *ngIf=\"!button.icon\">{{ button.label }}</ng-container>\n            <div *ngIf=\"button.icon\"\n                 class=\"icon\"\n                 [ngClass]=\"[button.icon]\">\n            </div>\n          </button>\n        </div>\n      </li>\n    </ul>\n\n    <div class=\"nw-editor-container\"\n         (click)=\"container.focus()\"\n         [ngClass]=\"{ 'nw-editor-container--with-toolbar': toolbarButtons.length }\">\n      <div *ngIf=\"editMode\"\n           class=\"nw-editor__src-container\">\n        <textarea [ngModel]=\"content\"\n                  (ngModelChange)=\"onTextareaChange($event)\"\n                  (blur)=\"propagateTouched()\"\n                  class=\"nw-editor__src\">\n        </textarea>\n      </div>\n      <div class=\"nw-editor\"\n           [ngClass]=\"{ 'nw-disabled': disabled,'nw-invisible': editMode }\">\n        <div *ngIf=\"shouldShowPlaceholder()\"\n             class=\"nw-editor__placeholder\"\n             [innerText]=\"placeholder\">\n        </div>\n        <div #ngWigEditable\n             class=\"nw-editor__res\"\n             [attr.contenteditable]=\"!disabled\"\n             [ngClass]=\"{ disabled: disabled}\"\n             (focus)=\"hasFocus = true\"\n             (blur)=\"onBlur()\"\n             (input)=\"onContentChange(ngWigEditable.innerHTML)\"><!--\n    --></div>\n      </div>\n    </div>\n  </div>\n",
                    providers: [
                        NgxWigToolbarService,
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return NgxWigComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
                    styles: [".ng-wig,[class^=nw-]{-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.ng-wig{display:block;padding:0;margin:0}.nw-toolbar{display:block;margin:0;padding:0;list-style:none;font-size:12px;color:#6b7277;background:linear-gradient(180deg,#fff 0,#f9f9f9 100%);border:1px solid #ccc;border-radius:3px 3px 0 0}.nw-toolbar__item{display:inline-block;vertical-align:top;margin:0;border-right:1px solid #dedede}.nw-toolbar label{line-height:30px;display:inline-block;padding:0 6px 0 3px}.nw-toolbar input[type=checkbox]{vertical-align:-3px;margin-right:-1px}.nw-editor{display:block;position:relative;height:300px;background:#fff;cursor:text;width:100%;overflow-y:auto}.nw-editor-container{border:1px solid #ccc;border-radius:0 0 3px 3px;position:relative}.nw-editor-container--with-toolbar{border-top:none}.nw-editor__res{display:block;min-height:100%;padding:1px 8px}.nw-editor__placeholder{display:block;position:absolute;padding:1px 8px;color:#d3d3d3;width:100%}.nw-editor__res,.nw-editor__src{width:100%;outline:0;box-sizing:border-box;border:none;margin:0}.nw-editor__res.disabled{opacity:.5}.nw-editor__src-container{position:absolute;left:0;top:0;right:0;bottom:0}.nw-editor__src{height:100%;resize:none;padding:1px 8px}.nw-editor--fixed .nw-editor{display:block;overflow-y:auto}.nw-editor--fixed .nw-editor__res{padding:1px 8px;display:block}.nw-invisible{visibility:hidden}.nw-editor--fixed .nw-invisible{display:none}.nw-editor.nw-disabled{cursor:default}.nw-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:30px;height:30px;margin:0;padding:0;opacity:.5;line-height:30px;background-color:transparent;background-position:center center;background-repeat:no-repeat;border:none;border-radius:2px;cursor:pointer}.nw-button:focus{outline:0;border-color:#d3d3d3;border-style:solid}.nw-button.nw-button--active,.nw-button:hover{opacity:1}.nw-button--active{background-color:#eee}.nw-button:disabled{cursor:default}.nw-button:disabled:hover{opacity:.5}.nw-content{padding:12px;margin:0;font-family:sans-serif;font-size:14px;line-height:24px}.nw-select{height:30px;padding:6px;color:#555;background-color:inherit;border:0}.nw-select:disabled{opacity:.5}.nw-select:focus{outline:0}[contenteditable]:empty:before{content:attr(placeholder);color:grey;display:inline-block}.icon{display:inline-block;height:1em;width:1em;vertical-align:-.125em}.icon-bold{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M747 1521q74 32 140 32 376 0 376-335 0-114-41-180-27-44-61.5-74t-67.5-46.5-80.5-25-84-10.5-94.5-2q-73 0-101 10 0 53-.5 159t-.5 158q0 8-1 67.5t-.5 96.5 4.5 83.5 12 66.5zm-14-746q42 7 109 7 82 0 143-13t110-44.5 74.5-89.5 25.5-142q0-70-29-122.5t-79-82-108-43.5-124-14q-50 0-130 13 0 50 4 151t4 152q0 27-.5 80t-.5 79q0 46 1 69zm-541 889l2-94q15-4 85-16t106-27q7-12 12.5-27t8.5-33.5 5.5-32.5 3-37.5.5-34v-65.5q0-982-22-1025-4-8-22-14.5t-44.5-11-49.5-7-48.5-4.5-30.5-3l-4-83q98-2 340-11.5t373-9.5q23 0 68 .5t68 .5q70 0 136.5 13t128.5 42 108 71 74 104.5 28 137.5q0 52-16.5 95.5t-39 72-64.5 57.5-73 45-84 40q154 35 256.5 134t102.5 248q0 100-35 179.5t-93.5 130.5-138 85.5-163.5 48.5-176 14q-44 0-132-3t-132-3q-106 0-307 11t-231 12z'/%3E%3C/svg%3E\") no-repeat}.icon-check{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z'/%3E%3C/svg%3E\") no-repeat}.icon-italic{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M384 1662l17-85q22-7 61.5-16.5t72-19 59.5-23.5q28-35 41-101 1-7 62-289t114-543.5 52-296.5v-25q-24-13-54.5-18.5t-69.5-8-58-5.5l19-103q33 2 120 6.5t149.5 7 120.5 2.5q48 0 98.5-2.5t121-7 98.5-6.5q-5 39-19 89-30 10-101.5 28.5t-108.5 33.5q-8 19-14 42.5t-9 40-7.5 45.5-6.5 42q-27 148-87.5 419.5t-77.5 355.5q-2 9-13 58t-20 90-16 83.5-6 57.5l1 18q17 4 185 31-3 44-16 99-11 0-32.5 1.5t-32.5 1.5q-29 0-87-10t-86-10q-138-2-206-2-51 0-143 9t-121 11z'/%3E%3C/svg%3E\") no-repeat}.icon-link{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z'/%3E%3C/svg%3E\") no-repeat}.icon-list-ol{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M381 1620q0 80-54.5 126t-135.5 46q-106 0-172-66l57-88q49 45 106 45 29 0 50.5-14.5t21.5-42.5q0-64-105-56l-26-56q8-10 32.5-43.5t42.5-54 37-38.5v-1q-16 0-48.5 1t-48.5 1v53h-106v-152h333v88l-95 115q51 12 81 49t30 88zm2-627v159h-362q-6-36-6-54 0-51 23.5-93t56.5-68 66-47.5 56.5-43.5 23.5-45q0-25-14.5-38.5t-39.5-13.5q-46 0-81 58l-85-59q24-51 71.5-79.5t105.5-28.5q73 0 123 41.5t50 112.5q0 50-34 91.5t-75 64.5-75.5 50.5-35.5 52.5h127v-60h105zm1409 319v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm-1408-899v99h-335v-99h107q0-41 .5-121.5t.5-121.5v-12h-2q-8 17-50 54l-71-76 136-127h106v404h108zm1408 387v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z'/%3E%3C/svg%3E\") no-repeat}.icon-list-ul{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z'/%3E%3C/svg%3E\") no-repeat}.icon-underline{background:url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg width='11' height='11' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M176 223q-37-2-45-4l-3-88q13-1 40-1 60 0 112 4 132 7 166 7 86 0 168-3 116-4 146-5 56 0 86-2l-1 14 2 64v9q-60 9-124 9-60 0-79 25-13 14-13 132 0 13 .5 32.5t.5 25.5l1 229 14 280q6 124 51 202 35 59 96 92 88 47 177 47 104 0 191-28 56-18 99-51 48-36 65-64 36-56 53-114 21-73 21-229 0-79-3.5-128t-11-122.5-13.5-159.5l-4-59q-5-67-24-88-34-35-77-34l-100 2-14-3 2-86h84l205 10q76 3 196-10l18 2q6 38 6 51 0 7-4 31-45 12-84 13-73 11-79 17-15 15-15 41 0 7 1.5 27t1.5 31q8 19 22 396 6 195-15 304-15 76-41 122-38 65-112 123-75 57-182 89-109 33-255 33-167 0-284-46-119-47-179-122-61-76-83-195-16-80-16-237v-333q0-188-17-213-25-36-147-39zm1488 1409v-64q0-14-9-23t-23-9h-1472q-14 0-23 9t-9 23v64q0 14 9 23t23 9h1472q14 0 23-9t9-23z'/%3E%3C/svg%3E\") no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    NgxWigComponent.ctorParameters = function () { return [
        { type: NgxWigToolbarService },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: ['WINDOW',] }] }
    ]; };
    NgxWigComponent.propDecorators = {
        content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        buttons: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        contentChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        ngxWigEditable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['ngWigEditable', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },] }]
    };
    return NgxWigComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function getWindowObject() {
    return window;
}
var ɵ0 = DEFAULT_LIBRARY_BUTTONS, ɵ1 = CUSTOM_LIBRARY_BUTTONS;
var NgxWigModule = /** @class */ (function () {
    function NgxWigModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    NgxWigModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgxWigModule,
            providers: [
                provideButtons(config),
                { provide: 'WINDOW', useFactory: getWindowObject },
            ],
        };
    };
    /**
     * @return {?}
     */
    NgxWigModule.forChild = /**
     * @return {?}
     */
    function () {
        return { ngModule: NgxWigModule };
    };
    NgxWigModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        NgxWigComponent
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    ],
                    exports: [NgxWigComponent],
                    providers: [
                        { provide: BUTTONS, multi: true, useValue: ɵ0 },
                        { provide: BUTTONS, multi: true, useValue: ɵ1 },
                        { provide: 'WINDOW', useFactory: getWindowObject },
                    ]
                },] }
    ];
    return NgxWigModule;
}());
/**
 * @param {?=} config
 * @return {?}
 */
function provideButtons(config) {
    if (!config || !config.buttonsConfig) {
        return [
            { provide: BUTTONS, multi: true, useValue: DEFAULT_LIBRARY_BUTTONS },
        ];
    }
    return [
        { provide: BUTTONS, multi: true, useValue: config.buttonsConfig },
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-wig.js.map


/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/ask-adoc/askadoc.component.html":
/*!*********************************************************************************************************************!*\
  !*** /home/angeloacr/Proyectos/PanaDoc/PanadocNx/node_modules/raw-loader!./src/app/ask-adoc/askadoc.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group mat-stretch-tabs backgroundColor=\"primary\" color=\"accent\" (selectedTabChange)=\"onTabChange($event)\">\n  <mat-tab label=\"Preguntas\" *ngIf=\"isDoctor\">\n\n    <div class=\"loading-shade\" *ngIf=\"($loading | async)\">\n      <mat-spinner></mat-spinner>\n    </div>\n    <panadoc-card-question [doctorId]='id' (answerEmitter)=\"answerQuestion($event)\" [question]=\"q\" [asker]=\"q.askerId\"\n      *ngFor=\"let q of $newQuestions | async as newQ\">\n    </panadoc-card-question>\n  </mat-tab>\n  <mat-tab label=\"Nueva Pregunta\" *ngIf=\"!isDoctor\">\n    <mat-card class=\"new-question\" fxLayout=\"column\">\n\n      <div class=\"loading-shade\" *ngIf=\"($loading | async)\">\n        <mat-spinner></mat-spinner>\n      </div>\n      <div class=\"options\" fxLayout=\"row\" [ngStyle]=\"{ width: '100%' }\" fxLayoutAlign=\"space-between center\">\n        <button (click)=\"clickReset()\" mat-icon-button>\n          <mat-icon>restore</mat-icon>\n        </button>\n        <mat-form-field fxFlex=\"90%\" fxFlexFill>\n          <input [(ngModel)]=\"question.title\" matInput placeholder=\"¿Cual es tu pregunta?\" />\n        </mat-form-field>\n        <button (click)=\"clickSend()\" disabled=\"question.title!==''&&question.details!==''\" mat-icon-button>\n          <mat-icon>send</mat-icon>\n        </button>\n      </div>\n      <div class=\"title\">\n\n        <ngx-wig (contentChange)=\"question.details=$event\" placeholder=\"Escriba los detalles de su pregunta aqui\">\n        </ngx-wig>\n      </div>\n\n    </mat-card>\n  </mat-tab>\n  <mat-tab label=\"Respondidas\">\n    <div class=\"loading-shade\" *ngIf=\"($loading | async)\">\n      <mat-spinner></mat-spinner>\n    </div>\n    <ng-container *ngIf=\"$answers | async as answers; else questions\">\n      <panadoc-card-answer *ngFor=\"let a of answers\" [question]=\"question\" [answerer]=\"a.doctorId\" [answer]=\"a\"\n        [asker]=\"a.doctorId\">\n      </panadoc-card-answer>\n    </ng-container>\n    <ng-template #questions>\n      <h5>No hay preguntas</h5>\n    </ng-template>\n\n\n  </mat-tab>\n</mat-tab-group>"

/***/ }),

/***/ "./src/app/ask-adoc/ask-adoc.module.ts":
/*!*********************************************!*\
  !*** ./src/app/ask-adoc/ask-adoc.module.ts ***!
  \*********************************************/
/*! exports provided: AskADocModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AskADocModule", function() { return AskADocModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_wig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-wig */ "../../node_modules/ngx-wig/fesm5/ngx-wig.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _askadoc_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./askadoc.component */ "./src/app/ask-adoc/askadoc.component.ts");
/* harmony import */ var _panadoc_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @panadoc/ui */ "../../libs/ui/src/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ "../../node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");









var routes = [
    {
        path: '',
        component: _askadoc_component__WEBPACK_IMPORTED_MODULE_5__["AskContainerComponent"]
    }
];
var AskADocModule = /** @class */ (function () {
    function AskADocModule() {
    }
    AskADocModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_askadoc_component__WEBPACK_IMPORTED_MODULE_5__["AskContainerComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _panadoc_ui__WEBPACK_IMPORTED_MODULE_6__["UiModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes), _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__["FlexModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], ngx_wig__WEBPACK_IMPORTED_MODULE_3__["NgxWigModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"]]
        })
    ], AskADocModule);
    return AskADocModule;
}());



/***/ }),

/***/ "./src/app/ask-adoc/ask.service.ts":
/*!*****************************************!*\
  !*** ./src/app/ask-adoc/ask.service.ts ***!
  \*****************************************/
/*! exports provided: AskService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AskService", function() { return AskService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _http_service_base_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../http-service-base.service */ "./src/app/http-service-base.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");







var baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].httpServer + '/askadoc';
var AskService = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AskService, _super);
    function AskService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    AskService.prototype.postAnswer = function (answer) {
        return this.http.put(baseURL + "/" + answer.questionId, answer, this.headers)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) { return !!response; }));
    };
    AskService.prototype.postNewQuestion = function (question) {
        return this.http.post(baseURL, question, this.headers).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (response) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(!!response);
        }));
    };
    AskService.prototype.fetchAvailableQuestions = function () {
        return this.http.get(baseURL + '/unanswered', this.headers)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (questions) {
            return questions.map(function (v) {
                var question = {
                    uid: v.uid,
                    askerId: v.userId,
                    title: v.title,
                    details: v._details,
                };
                return question;
            });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(function (e) {
            console.log(e);
            return [];
        }));
    };
    AskService.prototype.fetchAnsweredQuestions = function () {
        return this.http.get(baseURL + '/answered', this.headers)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(function (e) {
            console.log(e);
            return [];
        }));
    };
    AskService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    AskService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], AskService);
    return AskService;
}(_http_service_base_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"]));



/***/ }),

/***/ "./src/app/ask-adoc/askadoc.component.ts":
/*!***********************************************!*\
  !*** ./src/app/ask-adoc/askadoc.component.ts ***!
  \***********************************************/
/*! exports provided: AskContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AskContainerComponent", function() { return AskContainerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _panadoc_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @panadoc/data */ "../../libs/data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ask_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ask.service */ "./src/app/ask-adoc/ask.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers */ "./src/app/reducers/index.ts");
/* harmony import */ var _reducers_extra__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reducers/extra */ "./src/app/reducers/extra/index.ts");








var AskContainerComponent = /** @class */ (function () {
    function AskContainerComponent(store, http) {
        this.store = store;
        this.http = http;
        this.$newQuestions = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]);
        this.$answers = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]);
        this.$loading = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false);
        this.$loading = this.store.select(_reducers__WEBPACK_IMPORTED_MODULE_6__["loadingSelector"]);
    }
    AskContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["select"])('auth')).subscribe(function (user) {
            _this.isDoctor = Object(_panadoc_data__WEBPACK_IMPORTED_MODULE_2__["determineIfUserIsDoctor"])(user);
            _this.id = user.uid;
            _this.question = {
                title: "",
                askerId: user.uid,
                details: "",
            };
            _this.http.token = user.token;
            _this.question.askerId = user.uid;
        });
        if (this.isDoctor)
            this.$newQuestions = this.http.fetchAvailableQuestions(); //.pipe(tap(v => { debugger }));
    };
    AskContainerComponent.prototype.clickReset = function () {
        this.question = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.question, { title: "", details: "" });
    };
    AskContainerComponent.prototype.answerQuestion = function (answer) {
        var _this = this;
        this.store.dispatch(Object(_reducers_extra__WEBPACK_IMPORTED_MODULE_7__["startLoading"])());
        this.http.postAnswer(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, answer, { doctorId: this.id }))
            .subscribe(function (v) {
            return _this.store.dispatch(Object(_reducers_extra__WEBPACK_IMPORTED_MODULE_7__["stopLoading"])());
        });
    };
    AskContainerComponent.prototype.clickSend = function () {
        var _this = this;
        this.store.dispatch(Object(_reducers_extra__WEBPACK_IMPORTED_MODULE_7__["startLoading"])());
        this.http.postNewQuestion(this.question)
            .subscribe(function (v) {
            _this.clickReset();
            _this.store.dispatch(Object(_reducers_extra__WEBPACK_IMPORTED_MODULE_7__["stopLoading"])());
        });
    };
    AskContainerComponent.prototype.onTabChange = function (event) {
        if (event.index === 1) {
            this.$answers = this.http.fetchAnsweredQuestions();
        }
    };
    AskContainerComponent.ctorParameters = function () { return [
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"] },
        { type: _ask_service__WEBPACK_IMPORTED_MODULE_4__["AskService"] }
    ]; };
    AskContainerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'panadoc-container',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./askadoc.component.html */ "../../node_modules/raw-loader/index.js!./src/app/ask-adoc/askadoc.component.html")).default,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"],
            _ask_service__WEBPACK_IMPORTED_MODULE_4__["AskService"]])
    ], AskContainerComponent);
    return AskContainerComponent;
}());



/***/ })

}]);
//# sourceMappingURL=ask-adoc-ask-adoc-module.js.map