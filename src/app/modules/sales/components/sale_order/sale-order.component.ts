import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';
import { ISaleOrder } from '../../interfaces/isale-order';
import { LoadingService } from '../../services/loading.service';
import { ProductModel } from '../../models/ProductModel';
import { ProductService } from '../../services/product.service';
import { TypeSalesOrder } from '../../models/TypeSaleOrder';
import { SaleOrderStates } from '../../models/SalesOrderState';
import { IDetailsSaleOrder } from '../../interfaces/idetails-sale-order';
import { CarritoService } from '../../services/carrito.service';
import { MontoTotalModel } from '../../models/ModelTotalModel';

@Component({
  selector: 'fn-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {

  constructor(private saleOrderServiceService: SaleOrderServiceService,
    private loadingService: LoadingService,
    private productService: ProductService,
    private carritoService: CarritoService) { }

  salesOrderLoad: ISaleOrder | undefined
  loader = this.loadingService.viewLoader();
  listProduct: ProductModel[] = [];
  listProductfiltrada: ProductModel[] = [];
  carrito: ProductModel[] = this.carritoService.consultarCarrito();
  listDetailSaleOrder: IDetailsSaleOrder[] = [];

  permiteGenerar: boolean = true;

  productoSeleccionado = this.productService.cleanProduct();
  readonly typeSalesOrder = TypeSalesOrder.ORDEN_VENTA;
  readonly typePresupuesto = TypeSalesOrder.PRESUPUESTO;
  montoTotal: MontoTotalModel = new MontoTotalModel; 
  ngOnInit(): void {
    this.listProduct = this.productService.getlistProduct();
  }
  ActualizarTotal(cantidad: number) {
    console.log(this.carrito)
    this.montoTotal = this.saleOrderServiceService.calcularTotal(this.carrito)
  }
  agregarProducto() {

    if (this.productoSeleccionado.codigo == "")
      return;
    if (this.carritoService.validarProductoCargado(this.productoSeleccionado)) {
      alert("El Producto ya existe en el carrito")
      this.productoSeleccionado = this.productService.cleanProduct();
      return;
    }


    this.carrito = this.carritoService.agregarCarrito(this.productoSeleccionado);
    this.montoTotal = this.saleOrderServiceService.calcularTotal(this.carrito)
    this.productoSeleccionado = this.productService.cleanProduct();
  }
  selectProduct(product: ProductModel) {
    this.productoSeleccionado = product;
  }
  filtrarProductos(texto: any) {
    this.listProductfiltrada = this.productService.filtrarProductos(texto);
  }

  buildSaleOrder(stateDetail: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[]) {
    return this.saleOrderServiceService.buildSaleOrder(stateDetail, type, carrito);
  }

  async generateSaleOrder(type: TypeSalesOrder) {
    this.loader = this.loadingService.loading();
    let saleOrder = null;
    if (type == this.typeSalesOrder) {
      saleOrder = this.buildSaleOrder(SaleOrderStates.UNBILLED, type, this.carrito);
    } else if (type == this.typePresupuesto) {
      saleOrder = this.buildSaleOrder(SaleOrderStates.CREATE, type, this.carrito);
    }
    let validateCantidad = this.saleOrderServiceService.ValidarPresupuestoOOrdenVenta(saleOrder!, this.carrito)
    if (validateCantidad) {
      alert("existen productos que la cantidad superan el stock")
      this.loader = this.loadingService.loading();
      return;

    }

    this.salesOrderLoad = await this.saleOrderServiceService.createSaleOrder(saleOrder!)!
    this.listProduct = this.productService.restarCantidad(this.productoSeleccionado)
    this.loader = this.loadingService.loading();
  }
}
