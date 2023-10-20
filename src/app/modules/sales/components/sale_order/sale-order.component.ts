import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';
import { ISaleOrder } from '../../interfaces/isale-order';
import { LoadingService } from '../../services/loading.service';
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';
import { TypeSalesOrder } from '../../models/TypeSaleOrder';
import { SaleOrderStates } from '../../models/SalesOrderState';
import { IDetailsSaleOrder } from '../../interfaces/idetails-sale-order';

@Component({
  selector: 'fn-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {
test() {
throw new Error('Method not implemented.');
}

  constructor(private saleOrderServiceService: SaleOrderServiceService,
    private loadingService: LoadingService,
    private productService: ProductService) { }
  salesOrderLoad: ISaleOrder | undefined
  loader = this.loadingService.viewLoader();
  listProduct: IProduct[] = [];
  listProductfiltrada: IProduct[] = [];
  carrito: IProduct[] = [];
  listDetailSaleOrder: IDetailsSaleOrder[]=[];

  productoSeleccionado = this.cleanProduct();
  readonly typeSalesOrder = TypeSalesOrder.ORDEN_VENTA;
  readonly typePresupuesto = TypeSalesOrder.PRESUPUESTO;

  ngOnInit(): void {
    this.listProduct = this.productService.getlistProduct();
  }

  agregarProducto() {
    if(this.productoSeleccionado.codigo == "")
    return;
    this.carrito.push(this.productoSeleccionado);
    this.productoSeleccionado = this.cleanProduct();
  }
  selectProduct(product: IProduct) {
    this.productoSeleccionado = product;
  }
  filtrarProductos(texto: any) {
    this.listProductfiltrada = this.listProduct.filter(producto => producto.nombre.toLowerCase().includes(texto.target.value.toLowerCase()));
  }
  cleanProduct(): IProduct {
    let productoSeleccionado = {
      codigo: '',
      nombre: '',
      precioUnitario: 0,
      cantidad: 0,
      cantidadSeleccionado:1
    }

    return productoSeleccionado;
  }
  buildSaleOrder(state: SaleOrderStates, type: TypeSalesOrder) {
    let saleOrder: ISaleOrder = ({
      id_seller: 1,
      id_client: 1,
      date_of_issue: new Date().toISOString(),
      date_of_expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      state_sale_order: state,
      detail_sales_order: [
        {
          id_product: 1,
          quantity: 1,
          price: 100,
          state_sale_order_detail: state
        }
      ]
    });

    return saleOrder;
  }

  async generateSaleOrder(type: TypeSalesOrder) {
    this.loader = this.loadingService.loading();
    let saleOrder = null;
    if (type == this.typeSalesOrder) {
      saleOrder = this.buildSaleOrder(SaleOrderStates.UNBILLED, type);
    } else if (type == this.typePresupuesto) {
      saleOrder = this.buildSaleOrder(SaleOrderStates.CREATE, type);
    }

    this.salesOrderLoad = await this.saleOrderServiceService.createSaleOrder(saleOrder!)!
    this.loader = this.loadingService.loading();
  }

  validacionStock(event: any, cantidadStock:number){
    if(parseInt(event.target.value) > cantidadStock){
      alert("sumera el stock")
      event.target.value = 0;
    }
  }
}
