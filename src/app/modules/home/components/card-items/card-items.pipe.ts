import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardItemsPipe'
})
export class CardItemsPipe implements PipeTransform {
  transform(value: number): string {
    if (value || value === 0) {
      const brl = value / 100;
      return brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return '';
  }

}
