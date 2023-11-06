import { Component, OnInit } from '@angular/core';
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
import { SaleOrderProvider } from '../../services/salesOrder/SaleOrderProvider';
import { ICustomer } from '../../interfaces/iCustomer';
import { ClientProvider } from '../../services/clients/clientProvider';
import { ClientService } from '../../services/clients/client.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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
    private saleOrderProvider: SaleOrderProvider,
    private clientsService: ClientService) { }

  salesOrderLoad: SaleOrderModel | undefined
  loader = this.loadingService.viewLoader();
  listProduct: ProductModel[] = [];
  listProductfiltrada: ProductModel[] = [];
  carrito: ProductModel[] = this.carritoService.consultarCarrito();
  listDetailSaleOrder: DetailsSaleOrderModel[] = [];
  saleOrder: SaleOrderModel = new SaleOrderModel();
  permiteGenerar: boolean = true;
  listClients: ICustomer[] = []
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

  ngOnInit(): void {
    this.listProduct = this.productService.getlistProduct();
    this.listClients = this.clientsService.getListClients();
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
    this.listProductfiltrada = this.productService.filtrarProductos(texto);
  }

  buildSaleOrder(stateDetail: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[]): SaleOrderModel {
    return this.saleOrderServiceService.buildSaleOrder(stateDetail, type, carrito, this.saleOrder);
  }

  async generateSaleOrder(type: TypeSalesOrder) {
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

  deleteProduct(id: number) {
    this.carrito = this.carritoService.deleteProduct(id);
    this.ActualizarTotal();
  }

  generatePDF() {

    const div = document.getElementById('detalleOrdenVenta');

    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div!, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);

      // Add image Canvas to PDF
      const bufferXTitle = 130;
      const bufferYTitle = 15;
      const bufferX = 5
      const buffery = 35
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // Add title
      doc.setFontSize(16);
      doc.text('Presupuesto', bufferXTitle,  bufferYTitle); // Ajusta la posición según tu preferencia
      doc.addImage(img, 'PNG', bufferX, buffery , pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
    }).then((doc) => {
      doc.save('Presupuesto.pdf');
    });
  }

  cancelOrderSale(){
    this.productoSeleccionado = this.productService.cleanProduct();
    this.carrito = [];
  }
}

