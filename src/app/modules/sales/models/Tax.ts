export class Tax {
    id: number = 100;
    tax_value: number = 1.21;
    tax_type: string = 'VAT';
}

export const TaxEmpty: Tax = {
        id: 0,
        tax_type: 'Yerba Playadito',
        tax_value: 0
};