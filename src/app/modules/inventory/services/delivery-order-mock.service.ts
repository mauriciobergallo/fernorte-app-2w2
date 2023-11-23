import { Injectable } from '@angular/core';
import { DeliveryOrderPut } from '../models/delivery-order-put';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ILocationInfoProduct } from '../models/ILocationInfoProduct';
import { DeilveryOrder } from '../models/deilvery-order';

@Injectable({
  providedIn: 'root',
})
export class DeliveryOrderMockService {
  originallist: DeilveryOrder[] = this.originalItems();
  listFiltered: DeilveryOrder[] = [];
  listFilteredDate: DeilveryOrder[] = [];

  locationsList: ILocationInfoProduct[] = this.locations();
  constructor() {}

  originalItems(): DeilveryOrder[] {
    const list1 = [
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'Jack',
          last_name: 'Wilson',
          document_number: '30201777',
        },
        delivery_order_id: 2461,
        sale_order_id: 5055,
        created_at: '12/11/2023',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [
          {
            quantity: 3,
            state: 'PARTIALLY_DELIVERED',
            product_name: 'Destornillador Philips',
            delivered_quantity: 1,
            product_id: 789,
            quantity_delivery: 2,
          },
          {
            quantity: 7,
            state: 'PARTIALLY_DELIVERED',
            product_name: 'Taladro Electrico',
            delivered_quantity: 5,
            product_id: 456,
            quantity_delivery: 2,
          },
          {
            quantity: 2,
            state: 'DELIVERED',
            product_name: 'Enduido Plastico',
            delivered_quantity: 2,
            product_id: 123,
            quantity_delivery: 0,
          },
          {
            quantity: 5,
            state: 'CREATED',
            product_name: 'Ceramica',
            delivered_quantity: 0,
            product_id: 654,
            quantity_delivery: 5,
          },
          {
            quantity: 4,
            state: 'PARTIALLY_DELIVERED',
            product_name: 'Cinta metrica',
            delivered_quantity: 3,
            product_id: 987,
            quantity_delivery: 1,
          },
        ],
        client: {
          first_name: 'Charlie',
          last_name: 'Williams',
          document_number: '22223125',
        },
        delivery_order_id: 8543,
        sale_order_id: 3703,
        created_at: '17/07/2023',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'Frank',
          last_name: 'Jones',
          document_number: '44963332',
        },
        delivery_order_id: 5674,
        sale_order_id: 2869,
        created_at: '14/10/2023',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'Jack',
          last_name: 'Wilson',
          document_number: '37288278',
        },
        delivery_order_id: 9509,
        sale_order_id: 9190,
        created_at: '01/01/2022',
      },
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Moore',
          document_number: '26620671',
        },
        delivery_order_id: 9006,
        sale_order_id: 2735,
        created_at: '05/03/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Frank',
          last_name: 'Williams',
          document_number: '29279435',
        },
        delivery_order_id: 7419,
        sale_order_id: 3343,
        created_at: '22/11/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Bob',
          last_name: 'Miller',
          document_number: '21671541',
        },
        delivery_order_id: 4325,
        sale_order_id: 9982,
        created_at: '22/04/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Charlie',
          last_name: 'Wilson',
          document_number: '49240957',
        },
        delivery_order_id: 3020,
        sale_order_id: 9396,
        created_at: '05/05/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Grace',
          last_name: 'Wilson',
          document_number: '41026133',
        },
        delivery_order_id: 1339,
        sale_order_id: 3356,
        created_at: '16/02/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Charlie',
          last_name: 'Miller',
          document_number: '42125709',
        },
        delivery_order_id: 2548,
        sale_order_id: 1754,
        created_at: '24/01/2022',
      },
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Brown',
          document_number: '38334380',
        },
        delivery_order_id: 3042,
        sale_order_id: 2389,
        created_at: '25/06/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Moore',
          document_number: '35524943',
        },
        delivery_order_id: 6103,
        sale_order_id: 3690,
        created_at: '16/12/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'David',
          last_name: 'Brown',
          document_number: '46593456',
        },
        delivery_order_id: 6888,
        sale_order_id: 7704,
        created_at: '03/01/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Moore',
          document_number: '48288460',
        },
        delivery_order_id: 1741,
        sale_order_id: 6834,
        created_at: '06/07/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Bob',
          last_name: 'Moore',
          document_number: '35197512',
        },
        delivery_order_id: 5810,
        sale_order_id: 7776,
        created_at: '02/10/2022',
      },

      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Bob',
          last_name: 'Moore',
          document_number: '39721262',
        },
        delivery_order_id: 3252,
        sale_order_id: 6392,
        created_at: '13/09/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Davis',
          document_number: '16644432',
        },
        delivery_order_id: 3620,
        sale_order_id: 1818,
        created_at: '12/01/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Moore',
          document_number: '45320968',
        },
        delivery_order_id: 3227,
        sale_order_id: 1431,
        created_at: '24/03/2022',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'Jack',
          last_name: 'Davis',
          document_number: '32325553',
        },
        delivery_order_id: 6703,
        sale_order_id: 9873,
        created_at: '13/01/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Grace',
          last_name: 'Williams',
          document_number: '46071988',
        },
        delivery_order_id: 5746,
        sale_order_id: 6443,
        created_at: '23/09/2023',
      },
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'David',
          last_name: 'Wilson',
          document_number: '35175634',
        },
        delivery_order_id: 3292,
        sale_order_id: 7201,
        created_at: '01/12/2022',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'Emma',
          last_name: 'Miller',
          document_number: '21600888',
        },
        delivery_order_id: 7119,
        sale_order_id: 2317,
        created_at: '23/02/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Alice',
          last_name: 'Moore',
          document_number: '47622495',
        },
        delivery_order_id: 9788,
        sale_order_id: 2806,
        created_at: '14/03/2022',
      },
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'Emma',
          last_name: 'Johnson',
          document_number: '29819942',
        },
        delivery_order_id: 3417,
        sale_order_id: 9319,
        created_at: '14/03/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Alice',
          last_name: 'Brown',
          document_number: '49566362',
        },
        delivery_order_id: 1467,
        sale_order_id: 3600,
        created_at: '06/09/2022',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'Frank',
          last_name: 'Johnson',
          document_number: '10152925',
        },
        delivery_order_id: 9096,
        sale_order_id: 5676,
        created_at: '29/06/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Alice',
          last_name: 'Miller',
          document_number: '37645380',
        },
        delivery_order_id: 4894,
        sale_order_id: 5633,
        created_at: '24/01/2023',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'David',
          last_name: 'Williams',
          document_number: '18247781',
        },
        delivery_order_id: 9056,
        sale_order_id: 2142,
        created_at: '04/06/2023',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Grace',
          last_name: 'Jones',
          document_number: '12836531',
        },
        delivery_order_id: 9847,
        sale_order_id: 7245,
        created_at: '13/04/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Ivy',
          last_name: 'Moore',
          document_number: '32518896',
        },
        delivery_order_id: 9325,
        sale_order_id: 2322,
        created_at: '08/10/2023',
      },

      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Charlie',
          last_name: 'Williams',
          document_number: '47020245',
        },
        delivery_order_id: 7735,
        sale_order_id: 5975,
        created_at: '23/09/2023',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'David',
          last_name: 'Davis',
          document_number: '19181542',
        },
        delivery_order_id: 1904,
        sale_order_id: 4480,
        created_at: '15/08/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Jack',
          last_name: 'Brown',
          document_number: '49382580',
        },
        delivery_order_id: 6009,
        sale_order_id: 8513,
        created_at: '20/02/2022',
      },
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'David',
          last_name: 'Smith',
          document_number: '26304236',
        },
        delivery_order_id: 8093,
        sale_order_id: 2847,
        created_at: '25/06/2022',
      },
      {
        state: 'CREATED',
        details: [],
        client: {
          first_name: 'Frank',
          last_name: 'Brown',
          document_number: '39176511',
        },
        delivery_order_id: 6406,
        sale_order_id: 7019,
        created_at: '01/04/2023',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'David',
          last_name: 'Davis',
          document_number: '47848669',
        },
        delivery_order_id: 8466,
        sale_order_id: 9731,
        created_at: '12/05/2023',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Frank',
          last_name: 'Miller',
          document_number: '19243180',
        },
        delivery_order_id: 4766,
        sale_order_id: 5463,
        created_at: '28/11/2022',
      },
      {
        state: 'CANCELED',
        details: [],
        client: {
          first_name: 'Charlie',
          last_name: 'Davis',
          document_number: '19494213',
        },
        delivery_order_id: 2325,
        sale_order_id: 2322,
        created_at: '28/05/2023',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Hank',
          last_name: 'Moore',
          document_number: '27707206',
        },
        delivery_order_id: 6711,
        sale_order_id: 8199,
        created_at: '24/07/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Jack',
          last_name: 'Miller',
          document_number: '17949168',
        },
        delivery_order_id: 4364,
        sale_order_id: 8335,
        created_at: '07/08/2023',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Charlie',
          last_name: 'Jones',
          document_number: '48044237',
        },
        delivery_order_id: 8097,
        sale_order_id: 5937,
        created_at: '09/05/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Hank',
          last_name: 'Johnson',
          document_number: '20180758',
        },
        delivery_order_id: 9499,
        sale_order_id: 8389,
        created_at: '25/02/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Emma',
          last_name: 'Smith',
          document_number: '49730218',
        },
        delivery_order_id: 4934,
        sale_order_id: 6089,
        created_at: '22/04/2022',
      },
      {
        state: 'DELIVERED',
        details: [],
        client: {
          first_name: 'Jack',
          last_name: 'Moore',
          document_number: '29575613',
        },
        delivery_order_id: 6624,
        sale_order_id: 3845,
        created_at: '25/01/2022',
      },
      {
        state: 'PARTIALLY_DELIVERED',
        details: [],
        client: {
          first_name: 'Alice',
          last_name: 'Miller',
          document_number: '33271380',
        },
        delivery_order_id: 4063,
        sale_order_id: 3895,
        created_at: '03/10/2023',
      },
    ];
    const deliveryOrders: DeilveryOrder[] = list1.map((item) => {
      const deliveryOrder = new DeilveryOrder();
      deliveryOrder.state = item.state;
      deliveryOrder.details = item.details;
      deliveryOrder.client = item.client;
      deliveryOrder.delivery_order_id = item.delivery_order_id;
      deliveryOrder.sale_order_id = item.sale_order_id;
      deliveryOrder.created_at = item.created_at;

      return deliveryOrder;
    });
    return deliveryOrders;
  }

  locations(): ILocationInfoProduct[] {
    const locationInfoProductsMock: ILocationInfoProduct[] = [
      {
        location_id: 789,
        category_name: 'Categoría A',
        product_name: 'Destornillador Philips',
        capacityRemaining: 50,
        measure_unit: 'Unidad',
        max_capacity: 100,
        location: {
          id: 1,
          zone: 'Zona A',
          section: 'Sección 1',
          space: 'Espacio 1',
        },
        quantity: 10,
      },
      {
        location_id: 456,
        category_name: 'Categoría B',
        product_name: 'Taladro Electrico',
        capacityRemaining: 30,
        measure_unit: 'Unidad',
        max_capacity: 50,
        location: {
          id: 2,
          zone: 'Zona B',
          section: 'Sección 2',
          space: 'Espacio 2',
        },
        quantity: 5,
      },
      {
        location_id: 123,
        category_name: 'Categoría C',
        product_name: 'Enduido Plastico',
        capacityRemaining: 20,
        measure_unit: 'Unidad',
        max_capacity: 40,
        location: {
          id: 3,
          zone: 'Zona C',
          section: 'Sección 3',
          space: 'Espacio 3',
        },
        quantity: 8,
      },
      {
        location_id: 654,
        category_name: 'Categoría A',
        product_name: 'Ceramica',
        capacityRemaining: 40,
        measure_unit: 'Unidad',
        max_capacity: 60,
        location: {
          id: 4,
          zone: 'Zona A',
          section: 'Sección 1',
          space: 'Espacio 1',
        },
        quantity: 12,
      },
      {
        location_id: 987,
        category_name: 'Categoría B',
        product_name: 'Cinta metrica',
        capacityRemaining: 10,
        measure_unit: 'Unidad',
        max_capacity: 30,
        location: {
          id: 5,
          zone: 'Zona B',
          section: 'Sección 2',
          space: 'Espacio 2',
        },
        quantity: 3,
      },
    ];

    return locationInfoProductsMock;
  }

  filterByString(filterstr: string) {
    if (this.listFilteredDate.length > 0) {
      var filteredList = this.listFilteredDate.filter(
        (item) =>
          (item.client?.first_name + ' ' + item.client?.last_name)
            .toLowerCase()
            .includes(filterstr.trim().toLowerCase()) ||
          item.client?.document_number
            .toLowerCase()
            .includes(filterstr.toLowerCase())
      );
    } else {
      var filteredList = this.originallist.filter(
        (item) =>
          (item.client?.first_name + ' ' + item.client?.last_name)
            .toLowerCase()
            .includes(filterstr.trim().toLowerCase()) ||
          item.client?.document_number
            .toLowerCase()
            .includes(filterstr.toLowerCase())
      );
    }

    this.listFiltered = filteredList;
    return this.listFiltered;
  }

  clearFilter() {
    this.listFiltered = this.originallist;
    this.listFilteredDate = [];
    return this.originallist;
  }

  filterByDate(event: { from: NgbDate | null; to: NgbDate | null }) {
    if (event.from && event.to) {
      let fromDate = new Date(
        event.from.year,
        event.from.month - 1,
        event.from.day
      );
      let toDate = new Date(event.to.year, event.to.month - 1, event.to.day);

      this.listFiltered = this.originallist.filter((movement) => {
        let dateP = movement.created_at.split('/');

        let day = parseInt(dateP[0], 10);
        let month = parseInt(dateP[1], 10);
        let year = parseInt(dateP[2], 10);
        console.log(month);
        let movementDate = new Date(year, month - 1, day);

        return movementDate >= fromDate && movementDate <= toDate;
      });
    }
    this.listFilteredDate = this.listFiltered;
    return this.listFiltered;
  }
  getById(id: number) {
    var deliveryOrder = this.originallist.find(
      (order) => order.delivery_order_id === id
    );
    return deliveryOrder;
  }

  updateOrder(order: DeliveryOrderPut) {
    var orderService = this.originallist.find(
      (p) => p.delivery_order_id == order.delivery_order_id
    );

    if (orderService) {
      for (let i = 0; i < order.details.length; i++) {
        const orderDetail = orderService.details.find(
          (p) => p.product_id == order.details[i].product_id
        );

        if (orderDetail) {
          orderDetail.delivered_quantity += order.details[i].quantity;
          orderDetail.delivered_quantity =
            orderDetail.quantity - orderDetail.delivered_quantity;
          if (orderDetail.delivered_quantity == orderDetail.quantity) {
            orderDetail.state = 'DELIVERED';
          } else {
            orderDetail.state = 'PARTIALLY_DELIVERED';
          }
        }
      }

      if (
        orderService.details.every((detail) => detail.state === 'DELIVERED')
      ) {
        orderService.state = 'DELIVERED';
      } else {
        orderService.state = 'PARTIALLY_DELIVERED';
      }
    }
  }

  getLocationByProductName(id: string) {
    var location = this.locationsList.find((loc) => loc.product_name == id);
    return location;
  }
}
