// global QRCode
import { LightningElement, track } from 'lwc';
import resource from '@salesforce/resourceUrl/resource';
import { loadScript } from 'lightning/platformResourceLoader';
import verifyTOTP from '@salesforce/apex/TOTPController.verifyTOTP';
import getRegistrationURL from '@salesforce/apex/TOTPController.getRegistrationURL';

export default class TOTP extends LightningElement {

    isTOTPValid = 'TOTP not submitted';
    key;
    accountName = "MyAccount001";
    @track code = '';
    qrcode;

    connectedCallback() {
        loadScript(this, resource + '/qrcode.min.js')
            .then(() => {
                this.generateQR();
            });
    }

    async generateQR() {
        this.key = this.makeid(20);
        const data = await getRegistrationURL({ key: this.key, accountName: this.accountName });
        const qrCodeDiv = this.template.querySelector('.qrcode');
        if (!this.qrcode) {
            this.qrcode = new QRCode(qrCodeDiv, {
                text: data,
                width: 128,
                height: 128,
                colorDark: "black",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            this.qrcode.clear();
            this.qrcode.makeCode(data);
        }
    }

    // secretChange(e) {
    //     this.key = e.target.value;
    // }
    accountNameChange(e) {
        if (e.target.value) {
            this.accountName = e.target.value.replace(/\s/ig, '');
            e.target.value = this.accountName;
        }
    }
    codeChange(e) {
        this.code = e.target.value;
    }

    async checkValidity() {
        const isValid = await verifyTOTP({ code: this.code, key: this.key });
        if (isValid) {
            this.isTOTPValid = 'TOTP Valid!';
        } else {
            this.isTOTPValid = 'Invalid TOTO!';
        }
        this.code = '';
    }

    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

}