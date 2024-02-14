import { LightningElement } from 'lwc';
import { useCheckoutComponent, notifyCheckout } from 'commerce/checkoutApi';

const CheckoutStage = {
    CHECK_VALIDITY_UPDATE: 'CHECK_VALIDITY_UPDATE',
    REPORT_VALIDITY_SAVE: 'REPORT_VALIDITY_SAVE',
    BEFORE_PAYMENT: 'BEFORE_PAYMENT',
    PAYMENT: 'PAYMENT',
    BEFORE_PLACE_ORDER: 'BEFORE_PLACE_ORDER',
    PLACE_ORDER: 'PLACE_ORDER'
};

export default class Terms extends useCheckoutComponent (LightningElement) {

    checked = false;

    stageAction(checkoutStage /*CheckoutStage*/) {
        console.log('checkoutStage :>> ', checkoutStage);
        switch (checkoutStage) {
            case CheckoutStage.CHECK_VALIDITY_UPDATE:
                return Promise.resolve(this.checkValidity());
            case CheckoutStage.REPORT_VALIDITY_SAVE:
                return Promise.resolve(this.reportValidity());
            default:
                return Promise.resolve(true);
        }
    }

    checkValidity() {
        return this.checked;
    }

    reportValidity() {
        // this.showError = !this.checked;
        console.log('this.checked :>> ', this.checked);
        if (!this.checked) {
            this.dispatchUpdateErrorAsync({
                groupId: 'TermsAndConditions',
                type: '/commerce/errors/checkout-failure',
                exception: 'Terms and Conditions must be accepted first by clicking the checkbox',
            });
        } else {
            this.dispatchUpdateErrorAsync({
                groupId: 'TermsAndConditions',
                type: '/commerce/errors/checkout-failure',
                exception: null,
            });
        }

        //notifyCheckout(null);

        return this.checked;
    }

    handleChange(event) {
        this.checked = event.target.checked || false;
        // this.showError = !this.checked;
    }

}