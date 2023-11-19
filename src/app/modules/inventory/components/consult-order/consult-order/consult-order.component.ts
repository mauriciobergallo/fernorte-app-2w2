import { Component, OnInit } from '@angular/core';
import { DeliverOrderService } from '../../../services/deliver-order.service';
import { DeilveryOrder } from '../../../models/deilvery-order';
import { Pagination } from '../../../models/pagination';
import { StateIconPipePipe } from '../../../pipes/state-icon-pipe.pipe';
import { Router } from '@angular/router';
import { Client } from '../../../models/Client';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'fn-consult-order',
  templateUrl: './consult-order.component.html',
  styleUrls: ['./consult-order.component.css'],
})
export class ConsultOrderComponent implements OnInit{
  orderId: string = '';
  deliveryOrder: Pagination = new Pagination();
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  pagesToShow: number[] = [];
  loading: boolean = false;
  constructor(
    private deliveryorderService: DeliverOrderService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getMockData(this.currentPage);
    console.log(this.deliveryOrder);

  }

  navigateToDetails(orderId: number) {
    this.router.navigate(['inventory', 'orders', orderId, 'details']);
  }

  search() {
    this.loading = true;
    this.deliveryorderService
      .getDeliveryOrder(this.orderId, this.currentPage - 1)
      .subscribe(
        (result) => {
          result.items = result.items.sort((a, b) => {
            const statusOrder = [
              'CREATED',
              'PARTIALLY_DELIVERED',
              'DELIVERED',
              'CANCELED',
            ];
            return statusOrder.indexOf(a.state) - statusOrder.indexOf(b.state);
          });
          this.deliveryOrder = result;
          this.totalPages = result.totalPages;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          alert('Orden No encontrada');
        }
      );
  }

  getTooltipText(state: string): string {
    switch (state) {
      case 'CREATED':
        return 'Estado: Creado';
      case 'PARTIALLY_DELIVERED':
        return 'Estado: Parcialmente entregado';
      case 'DELIVERED':
        return 'Estado: Entregado';
      case 'CANCELED':
        return 'Estado: Cancelado';
      default:
        return '';
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMockData(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMockData(this.currentPage);
    }
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  
  onOrderIdChange(value: string): void {
    this.orderId = value.trim();
    this.getMockData(1);
  }

  generateMock(): DeilveryOrder
  {
    const orderStates = ['CREATED', 'PARTIALLY_DELIVERED', 'DELIVERED', 'CANCELED'];
    const getRandomOrderState = (): string => {
      const randomIndex = Math.floor(Math.random() * orderStates.length);
      return orderStates[randomIndex];
  };
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomDate = (): string => {
    const startDate = new Date(2022, 0, 1); // Start date for the range
    const endDate = new Date(); // Current date as the end date
    const randomDate = new Date(
        startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );
    const day = randomDate.getDate().toString().padStart(2, '0');
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const year = randomDate.getFullYear();


    return `${day}/${month}/${year}`;};
    const order = new DeilveryOrder();
    order.state = getRandomOrderState();
    order.delivery_order_id = getRandomNumber(1000, 9999);
    order.sale_order_id = getRandomNumber(1000, 9999);
    order.created_at = generateRandomDate();

    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];
  
    const getRandomElement = (array: string[]): string => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
  };
    const generateRandomPerson = (): any => {
      const first_name = getRandomElement(names);
      const last_name = getRandomElement(lastNames);
      const generateRandomDocumentNumberInRange = (): string => {
        const minNumber = 10000000;
        const maxNumber = 50000000;
    
        const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        return randomNumber.toString().padStart(8, '0');
    };
    
      const document_number = generateRandomDocumentNumberInRange();
  
      return {
        first_name,
          last_name,
          document_number,
      };
  };

  var client = new Client();
  
  client = generateRandomPerson();
  order.client = client;
    return order;
  }

  cargarMock()
  {
    const mockOrders: DeilveryOrder[] = [];
    for (let i = 1; i <= 15; i++) {
        const mockOrder = this.generateMock();
        mockOrders.push(mockOrder);
    }

    this.deliveryOrder = new Pagination();
    this.deliveryOrder.items = mockOrders;
    console.log(mockOrders);
    this.deliveryOrder.page = 0;
    this.deliveryOrder.totalPages = 3;
    this.totalPages = 3;
    
}


movimientosOriginales(): any
{

  const list1 = [
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "Jack",
            "last_name": "Wilson",
            "document_number": "30201777"
        },
        "delivery_order_id": 2461,
        "sale_order_id": 5055,
        "created_at": "12/11/2023"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Charlie",
            "last_name": "Williams",
            "document_number": "22223125"
        },
        "delivery_order_id": 8543,
        "sale_order_id": 3703,
        "created_at": "17/07/2023"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "Frank",
            "last_name": "Jones",
            "document_number": "44963332"
        },
        "delivery_order_id": 5674,
        "sale_order_id": 2869,
        "created_at": "14/10/2023"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "Jack",
            "last_name": "Wilson",
            "document_number": "37288278"
        },
        "delivery_order_id": 9509,
        "sale_order_id": 9190,
        "created_at": "01/01/2022"
    },
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Moore",
            "document_number": "26620671"
        },
        "delivery_order_id": 9006,
        "sale_order_id": 2735,
        "created_at": "05/03/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Frank",
            "last_name": "Williams",
            "document_number": "29279435"
        },
        "delivery_order_id": 7419,
        "sale_order_id": 3343,
        "created_at": "22/11/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Bob",
            "last_name": "Miller",
            "document_number": "21671541"
        },
        "delivery_order_id": 4325,
        "sale_order_id": 9982,
        "created_at": "22/04/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Charlie",
            "last_name": "Wilson",
            "document_number": "49240957"
        },
        "delivery_order_id": 3020,
        "sale_order_id": 9396,
        "created_at": "05/05/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Grace",
            "last_name": "Wilson",
            "document_number": "41026133"
        },
        "delivery_order_id": 1339,
        "sale_order_id": 3356,
        "created_at": "16/02/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Charlie",
            "last_name": "Miller",
            "document_number": "42125709"
        },
        "delivery_order_id": 2548,
        "sale_order_id": 1754,
        "created_at": "24/01/2022"
    },
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Brown",
            "document_number": "38334380"
        },
        "delivery_order_id": 3042,
        "sale_order_id": 2389,
        "created_at": "25/06/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Moore",
            "document_number": "35524943"
        },
        "delivery_order_id": 6103,
        "sale_order_id": 3690,
        "created_at": "16/12/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "David",
            "last_name": "Brown",
            "document_number": "46593456"
        },
        "delivery_order_id": 6888,
        "sale_order_id": 7704,
        "created_at": "03/01/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Moore",
            "document_number": "48288460"
        },
        "delivery_order_id": 1741,
        "sale_order_id": 6834,
        "created_at": "06/07/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Bob",
            "last_name": "Moore",
            "document_number": "35197512"
        },
        "delivery_order_id": 5810,
        "sale_order_id": 7776,
        "created_at": "02/10/2022"
    }
  
    ,{
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Bob",
            "last_name": "Moore",
            "document_number": "39721262"
        },
        "delivery_order_id": 3252,
        "sale_order_id": 6392,
        "created_at": "13/09/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Davis",
            "document_number": "16644432"
        },
        "delivery_order_id": 3620,
        "sale_order_id": 1818,
        "created_at": "12/01/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Moore",
            "document_number": "45320968"
        },
        "delivery_order_id": 3227,
        "sale_order_id": 1431,
        "created_at": "24/03/2022"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "Jack",
            "last_name": "Davis",
            "document_number": "32325553"
        },
        "delivery_order_id": 6703,
        "sale_order_id": 9873,
        "created_at": "13/01/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Grace",
            "last_name": "Williams",
            "document_number": "46071988"
        },
        "delivery_order_id": 5746,
        "sale_order_id": 6443,
        "created_at": "23/09/2023"
    },
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "David",
            "last_name": "Wilson",
            "document_number": "35175634"
        },
        "delivery_order_id": 3292,
        "sale_order_id": 7201,
        "created_at": "01/12/2022"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "Emma",
            "last_name": "Miller",
            "document_number": "21600888"
        },
        "delivery_order_id": 7119,
        "sale_order_id": 2317,
        "created_at": "23/02/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Alice",
            "last_name": "Moore",
            "document_number": "47622495"
        },
        "delivery_order_id": 9788,
        "sale_order_id": 2806,
        "created_at": "14/03/2022"
    },
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "Emma",
            "last_name": "Johnson",
            "document_number": "29819942"
        },
        "delivery_order_id": 3417,
        "sale_order_id": 9319,
        "created_at": "14/03/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Alice",
            "last_name": "Brown",
            "document_number": "49566362"
        },
        "delivery_order_id": 1467,
        "sale_order_id": 3600,
        "created_at": "06/09/2022"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "Frank",
            "last_name": "Johnson",
            "document_number": "10152925"
        },
        "delivery_order_id": 9096,
        "sale_order_id": 5676,
        "created_at": "29/06/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Alice",
            "last_name": "Miller",
            "document_number": "37645380"
        },
        "delivery_order_id": 4894,
        "sale_order_id": 5633,
        "created_at": "24/01/2023"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "David",
            "last_name": "Williams",
            "document_number": "18247781"
        },
        "delivery_order_id": 9056,
        "sale_order_id": 2142,
        "created_at": "04/06/2023"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Grace",
            "last_name": "Jones",
            "document_number": "12836531"
        },
        "delivery_order_id": 9847,
        "sale_order_id": 7245,
        "created_at": "13/04/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Ivy",
            "last_name": "Moore",
            "document_number": "32518896"
        },
        "delivery_order_id": 9325,
        "sale_order_id": 2322,
        "created_at": "08/10/2023"
    },
  
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Charlie",
            "last_name": "Williams",
            "document_number": "47020245"
        },
        "delivery_order_id": 7735,
        "sale_order_id": 5975,
        "created_at": "23/09/2023"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "David",
            "last_name": "Davis",
            "document_number": "19181542"
        },
        "delivery_order_id": 1904,
        "sale_order_id": 4480,
        "created_at": "15/08/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Jack",
            "last_name": "Brown",
            "document_number": "49382580"
        },
        "delivery_order_id": 6009,
        "sale_order_id": 8513,
        "created_at": "20/02/2022"
    },
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "David",
            "last_name": "Smith",
            "document_number": "26304236"
        },
        "delivery_order_id": 8093,
        "sale_order_id": 2847,
        "created_at": "25/06/2022"
    },
    {
        "state": "CREATED",
        "details": [],
        "client": {
            "first_name": "Frank",
            "last_name": "Brown",
            "document_number": "39176511"
        },
        "delivery_order_id": 6406,
        "sale_order_id": 7019,
        "created_at": "01/04/2023"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "David",
            "last_name": "Davis",
            "document_number": "47848669"
        },
        "delivery_order_id": 8466,
        "sale_order_id": 9731,
        "created_at": "12/05/2023"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Frank",
            "last_name": "Miller",
            "document_number": "19243180"
        },
        "delivery_order_id": 4766,
        "sale_order_id": 5463,
        "created_at": "28/11/2022"
    },
    {
        "state": "CANCELED",
        "details": [],
        "client": {
            "first_name": "Charlie",
            "last_name": "Davis",
            "document_number": "19494213"
        },
        "delivery_order_id": 2325,
        "sale_order_id": 2322,
        "created_at": "28/05/2023"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Hank",
            "last_name": "Moore",
            "document_number": "27707206"
        },
        "delivery_order_id": 6711,
        "sale_order_id": 8199,
        "created_at": "24/07/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Jack",
            "last_name": "Miller",
            "document_number": "17949168"
        },
        "delivery_order_id": 4364,
        "sale_order_id": 8335,
        "created_at": "07/08/2023"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Charlie",
            "last_name": "Jones",
            "document_number": "48044237"
        },
        "delivery_order_id": 8097,
        "sale_order_id": 5937,
        "created_at": "09/05/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Hank",
            "last_name": "Johnson",
            "document_number": "20180758"
        },
        "delivery_order_id": 9499,
        "sale_order_id": 8389,
        "created_at": "25/02/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Emma",
            "last_name": "Smith",
            "document_number": "49730218"
        },
        "delivery_order_id": 4934,
        "sale_order_id": 6089,
        "created_at": "22/04/2022"
    },
    {
        "state": "DELIVERED",
        "details": [],
        "client": {
            "first_name": "Jack",
            "last_name": "Moore",
            "document_number": "29575613"
        },
        "delivery_order_id": 6624,
        "sale_order_id": 3845,
        "created_at": "25/01/2022"
    },
    {
        "state": "PARTIALLY_DELIVERED",
        "details": [],
        "client": {
            "first_name": "Alice",
            "last_name": "Miller",
            "document_number": "33271380"
        },
        "delivery_order_id": 4063,
        "sale_order_id": 3895,
        "created_at": "03/10/2023"
    }
  ]

  return list1;
  
}



getMockData(page: number,)
{


var list1 = this.deliveryOrder?.items;
this.deliveryOrder = new Pagination();
this.deliveryOrder.page = 0;
this.deliveryOrder.totalPages = 3;
this.totalPages = 3; 

console.log(this.orderId);
if(this.orderId != '' && this.orderId != ' ')
{
  var filteredList = list1.filter((item: { client: { first_name: string; last_name: string; document_number: string; }; }) =>
    (item.client.first_name + ' ' + item.client.last_name)
          .toLowerCase()
          .includes(this.orderId.trim().toLowerCase()) ||
    item.client.document_number.toLowerCase().includes(this.orderId.toLowerCase())
  );
  this.deliveryOrder.totalPages = 1;
this.totalPages = 1;   
  this.deliveryOrder.items = filteredList.slice(0, 14);

}else 
{
  if(page == 1)
 {
  this.deliveryOrder.items = this.movimientosOriginales().slice(0, 14);
}
else if (page == 2)
{
  this.deliveryOrder.items = this.movimientosOriginales().slice(14,29);
}else
{
  this.deliveryOrder.items = this.movimientosOriginales().slice(30,44);
}
}
}

filterByDate(event: { from: NgbDate | null; to: NgbDate | null }) {
  if (event.from && event.to) {
    let fromDate = new Date(
      event.from.year,
      event.from.month - 1,
      event.from.day
    );
    let toDate = new Date(event.to.year, event.to.month - 1, event.to.day);

    this.deliveryOrder = new Pagination();
    this.deliveryOrder.page = 0;
    this.deliveryOrder.totalPages = 3;
    this.totalPages = 3; 
    this.deliveryOrder.items = this.movimientosOriginales();
    this.deliveryOrder.items = this.deliveryOrder.items.filter((movement) => {
      let dateP = movement.created_at.split('/');

      let day = parseInt(dateP[0], 10);
      let month = parseInt(dateP[1], 10);
      let year = parseInt(dateP[2], 10);
      console.log(month);
      let movementDate = new Date(year, month - 1, day);

      return movementDate >= fromDate && movementDate <= toDate;
    });
    this.orderId = '';
}
}

clearFilters()
{
  var list1 = this.movimientosOriginales();
  this.deliveryOrder = new Pagination();
  this.deliveryOrder.page = 0;
  this.deliveryOrder.totalPages = 3;
  this.totalPages = 3; 
  this.deliveryOrder.items = list1;
}
}
