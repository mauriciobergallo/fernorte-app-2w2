import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { SaleOrderModel } from '../../models/SaleOrderModel';
import { LoadingService } from '../../services/loading.service';
import { ProductModel } from '../../models/ProductModel';
import { ProductService } from '../../services/products/product.service';
import { TypeSalesOrder } from '../../models/TypeSaleOrder';
import { SaleOrderStates } from '../../models/SalesOrderState';
import { DetailsSaleOrderModel } from '../../models/DetailsSaleOrderModel';
import { CarritoService } from '../../services/carrito.service';
import { MontoTotalModel } from '../../models/ModelTotalModel';
import { ICustomer } from '../../interfaces/iCustomer';
import { ClientService } from '../../services/clients/client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'fn-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {
  @ViewChild('detalleOrdenVenta') detalleOrdenVenta: ElementRef | undefined;

  constructor(private saleOrderServiceService: SaleOrderServiceService,
    private loadingService: LoadingService,
    private productService: ProductService,
    private carritoService: CarritoService,
    private clientsService: ClientService,
    private route:Router) { }

  salesOrderLoad: SaleOrderModel | undefined
  loader = this.loadingService.viewLoader();
  listProduct: ProductModel[] = [];
  listProductfiltrada: ProductModel[] = [];
  carrito: ProductModel[] = this.carritoService.consultarCarrito();
  listDetailSaleOrder: DetailsSaleOrderModel[] = [];
  saleOrder: SaleOrderModel = new SaleOrderModel();
  permiteGenerar: boolean = true;
  listClients!: ICustomer;
  listClientsfiltrada: ICustomer[] = [];
  productoSeleccionado = this.productService.cleanProduct();
  readonly typeSalesOrder = TypeSalesOrder.ORDEN_VENTA;
  readonly typePresupuesto = TypeSalesOrder.PRESUPUESTO;
  montoTotal: MontoTotalModel = new MontoTotalModel;
  titulo = 'Título del Modal';
  descripcion = 'Descripción del Modal';
  funcionalidades = [
    {
      nombre: 'Función 1',
      funcion: () => {
        // Implementa la funcionalidad de la Función 1 aquí
      }
    },
    // Agrega más funcionalidades si es necesario
  ];
  spiner:boolean = true;

  ngOnInit(): void {
    this.productService.getListProduct().subscribe(x=>{
      this.listProduct=x;
      this.spiner=false;
    })  
    this.clientsService.getClient().subscribe(x=>{
      this.listClients=x;      
    })
  }
  ActualizarTotal() {
    this.montoTotal = this.saleOrderServiceService.calcularTotal(this.carrito)
  }
  agregarProducto(): void {

    if (this.productoSeleccionado.idProduct == 0)
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
  selectProduct(product: ProductModel): void {
    this.productoSeleccionado = product;
    this.listProductfiltrada = [];
  }
  filtrarProductos(texto: any): void {
    this.listProductfiltrada = this.productService.filtrarProductos(texto.target.value.toString());
  }

  buildSaleOrder(stateDetail: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[]): SaleOrderModel {
    return this.saleOrderServiceService.buildSaleOrder(stateDetail, type, carrito, this.saleOrder);
  }

  async generateSaleOrder(type: TypeSalesOrder) {
    if(this.carrito.length>0){
      Swal.fire({
        title: "Registrar orden de venta",
        text:"¿Seguro que quieres registrar la orden de venta?",
        icon:"question",
        showCancelButton: true,
        confirmButtonText: "Guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:"Registrar orden de venta",
            text:"Orden de venta se registro exitosamente!",
            icon:"success"
          });
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
  
      this.saleOrderServiceService.createSaleOrder(this.saleOrder!).subscribe((res) => {
        this.saleOrder = res.data
        
      });
      this.listProduct = this.productService.restarCantidad(this.productoSeleccionado)
      this.loader = this.loadingService.loading();
        } 
      });
    }
    
    
  }

  deleteProduct(id: number) {
    this.carrito = this.carritoService.deleteProduct(id);
    this.ActualizarTotal();
  }




  cancelOrderSale() {
    this.productoSeleccionado = this.productService.cleanProduct();
    this.carrito = [];
    Swal.fire({
      title: "Registrar orden de venta",
      text:"¿Seguro que quieres cancelar la orden?",
      icon:"success",
      showCancelButton: true,
      confirmButtonText: "Ok"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:"Registrar orden de venta",
          text:"Cancelado",
          icon:"success"
        });
      } 
    });
    this.route.navigateByUrl('')
}
}