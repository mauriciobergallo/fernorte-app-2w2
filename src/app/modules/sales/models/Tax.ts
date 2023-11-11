export class Tax {
    id: number = 0;
    tax_value: number = 0;
    tax_type: string = '';
}

export const TaxEmpty: Tax = {
        id: 0,
        tax_type: 'Yerba Playadito',
        tax_value: 0
};