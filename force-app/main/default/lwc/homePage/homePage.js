import { LightningElement } from 'lwc';

import getPhotoUrl from '@salesforce/apex/HomePageController.getPhotoUrl';
import Url from '@salesforce/schema/AuthConfig.Url';

export default class HomePage extends LightningElement {

    showSpinner = false;
    imageUrl = encodeURI(`data:image/svg+xml, <svg xmlns='http://www.w3.org/2000/svg' width='400px' height='480px' viewBox='0 0 400 480'><rect x='0' y='0' width='400px' height='480px' fill='rgba(217, 217, 217, 0.5)' /></svg>`);

    async connectedCallback() {
        this.toggleSpinner();
        this.imageUrl = await getPhotoUrl();
        this.toggleSpinner();
    }

    toggleSpinner() {
        this.showSpinner = !this.showSpinner;
    }
}