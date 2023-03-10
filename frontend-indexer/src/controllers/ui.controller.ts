import { IHtmlService, HtmlService } from "../services/html.service";
import { IButtonService, ButtonService } from "../services/button.service";
import { ILayoutService, LayoutService } from "../services/layout.service";
import { IFormService, FormService } from "../services/form.service";
import { IMainController } from "./main.controller";
import { Contractor } from "../interfaces/interfaces";

export interface IUIController {

    buttons: IButtonService;
    forms: IFormService;
    html: IHtmlService;
    layout: ILayoutService; 
    main: IMainController;
    

    beforeInit: () => void;
    afterInit: () => void;
    beforeFindContractor: () => void;
    beforeSelectContractor: (selection: Contractor[]) => void;
    afterSelectContractor: () => void;
    afterAddressSwitch: (owner: string) => void;
    beforeRenewProfileList: () => void;
    afterRenewProfileList: (listData: any[]) => void;
    beforeCheckCapability: () => void;
    addProfileForm: (owner: string) => void;
    afterUpdateProfile: (owner: string) => void;
}

export class UIController {

    buttons: IButtonService;
    forms: IFormService;
    html: IHtmlService;
    layout: ILayoutService;
    main: IMainController;

    constructor(main: IMainController) {

        this.buttons = new ButtonService(this);
        this.forms = new FormService(this)
        this.html = new HtmlService(this);
        this.layout = new LayoutService(this);
        this.main =  main;
    }

    beforeInit() {

        this.layout.init();
        this.forms.init();
        this.buttons.init();
    }

    afterInit() {

        this.buttons.updateIdentityPane();
    }

    beforeFindContractor() {
        this.layout.clearSection('select_contractor'); 
        this.layout.showSection('select_contractor'); 
        this.layout.toggleSpinner('select_contractor')
    }

    beforeSelectContractor(selection: Contractor[]) {

        this.layout.clearSection('select_contractor'); 
        this.layout.addContractorSelectList(this.html.selectContractorList(selection));
        this.layout.toggleSpinner('select_contractor');

        this.buttons.updateIdentityPane();
  
        // this.layout.hideSection("intermediary");
        // this.layout.hideSection("capability");
        // this.layout.showSection("select_eth_address");
    }

    afterSelectContractor() {

        this.layout.hideSection('select_contractor'); 
        this.buttons.updateIdentityPane();
    }

    afterAddressSwitch(owner: string) {
        
        // this.layout.hideSection("intermediary");
        // this.layout.hideSection("capability");
        // document.getElementById("validated").hidden = true; 
        // document.getElementById("cap").innerHTML = "";
        this.buttons.updateIdentityPane();
        this.buttons.addEditButton(owner);
    }

    beforeRenewProfileList() {
        this.layout.clearSection("list");
        this.layout.toggleSpinner("list");
    }

    afterRenewProfileList(listData: any[]) {
        this.html.renderProfileList(listData.reverse())
    }

    beforeCheckCapability() {
        this.layout.showSection("capability");
    }


    addProfileForm(owner: string) {
        this.forms.addProfileForm(owner);
    }

    afterUpdateProfile(owner: string) {
        this.buttons.addEditButton(owner);
    }
}

