import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';
import { SaleOrderModel } from '../../models/SaleOrderModel';
import { LoadingService } from '../../services/loading.service';
import { ProductModel } from '../../models/ProductModel';
import { ProductService } from '../../services/product.service';
import { TypeSalesOrder } from '../../models/TypeSaleOrder';
import { SaleOrderStates } from '../../models/SalesOrderState';
import { DetailsSaleOrderModel } from '../../models/DetailsSaleOrderModel';
import { CarritoService } from '../../services/carrito.service';
import { MontoTotalModel } from '../../models/ModelTotalModel';
import { SaleOrderProvider } from '../../providers/SaleOrderProvider';

@Component({
  selector: 'fn-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {

  constructor(private saleOrderServiceService: SaleOrderServiceService,
    private loadingService: LoadingService,
    private productService: ProductService,
    private carritoService: CarritoService,
    private saleOrderProvider: SaleOrderProvider) { }

  salesOrderLoad: SaleOrderModel | undefined
  loader = this.loadingService.viewLoader();
  listProduct: ProductModel[] = [];
  listProductfiltrada: ProductModel[] = [];
  carrito: ProductModel[] = this.carritoService.consultarCarrito();
  listDetailSaleOrder: DetailsSaleOrderModel[] = [];
  saleOrder: SaleOrderModel = new SaleOrderModel();
  permiteGenerar: boolean = true;

  productoSeleccionado = this.productService.cleanProduct();
  readonly typeSalesOrder = TypeSalesOrder.ORDEN_VENTA;
  readonly typePresupuesto = TypeSalesOrder.PRESUPUESTO;
  montoTotal: MontoTotalModel = new MontoTotalModel; 
  ngOnInit(): void {
    this.listProduct = this.productService.getlistProduct();
  }
  ActualizarTotal(){
    this.montoTotal = this.saleOrderServiceService.calcularTotal(this.carrito)
  }
  agregarProducto():void{

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
  selectProduct(product: ProductModel):void{
    this.productoSeleccionado = product;
  }
  filtrarProductos(texto: any):void{
    this.listProductfiltrada = this.productService.filtrarProductos(texto);
  }

  buildSaleOrder(stateDetail: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[]):SaleOrderModel{
    return this.saleOrderServiceService.buildSaleOrder(stateDetail, type, carrito, this.saleOrder);
  }

  async generateSaleOrder(type: TypeSalesOrder){
    this.loader = this.loadingService.loading();

    if (type == this.typeSalesOrder) {
      this.saleOrder = this.buildSaleOrder(SaleOrderStates.UNBILLED, type, this.carrito);
    } else if (type == this.typePresupuesto) {
      this.saleOrder = this.buildSaleOrder(SaleOrderStates.CREATE, type, this.carrito);
    }
    let validateCantidad = this.saleOrderServiceService.ValidarPresupuestoOOrdenVenta(this.saleOrder!, this.carrito)
    if (validateCantidad) {
      alert("existen productos que la cantidad superan el stock")
      this.loader = this.loadingService.loading();
      return;

    }

     this.saleOrderProvider.createSaleOrder(this.saleOrder!).subscribe((res) => {
      if (res.ok) {
       this.saleOrder = res.data
      }
    });
    this.listProduct = this.productService.restarCantidad(this.productoSeleccionado)
    this.loader = this.loadingService.loading();
  }

  deleteProduct(id:string){
   this.carrito = this.carritoService.deleteProduct(id);
   this.ActualizarTotal();
  }
}
