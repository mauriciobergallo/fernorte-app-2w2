# FerNorte

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Libraries

### PDF

To use PDF... 

``` html
<!-- default a4's width is 595.28px -->
<div #myDiv id="page" style="width: 595.28px;color: black;background: white;">
  <h3>PDF for Test</h3>
  <p>Here is some content for testing!!</p>
</div>

<button id="btn" (click)="generatePdf()">Generate</button>
```

``` typescript
@ViewChild('myDiv') myDiv: ElementRef | undefined;

generatePdf() {
    html2PDF(this.myDiv?.nativeElement, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: './pdf/generate.pdf'
    });
}
```

### ChartJS

To use ChartJS...

``` html
<div style="display: block;">
  <canvas baseChart width="400" height="400"
    [type]="'line'"
    [data]="lineChartData"
    [options]="lineChartOptions"
    [legend]="lineChartLegend">
  </canvas>
</div>
```

``` typescript
import { ChartConfiguration, ChartOptions } from 'chart.js';

...

public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ],
    datasets: [
        {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
        }
    ]
};
public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
};

public lineChartLegend = true;
```

### SweetAlert2

To use SweetAlert...

``` html
<button (click)="trySweetAlert()">Try SweetAlert</button>
```

``` typescript
trySweetAlert() {
    Swal.fire('Hola!', '<div> Este es un mensaje </div>');
}
```