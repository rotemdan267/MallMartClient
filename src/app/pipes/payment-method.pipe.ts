import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return 'Paypal';

      case 1:
        return 'Visa';

      case 2:
        return 'Mastercard';

      case 3:
        return 'Bitcoin';

      case 4:
        return 'None';

      default:
        return 'Unknown';
    }
  }

}
