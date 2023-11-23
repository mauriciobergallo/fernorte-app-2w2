import { User } from "../models/user";

export const USER_LIST: User[] = [
    {
        username: 'i.mendez',
        email: 'i.mendez@fernorte.com',
        password: 'catalogo2023',
        role: ['Responsable de precio', 'Responsable descuentos', 'Encargado de catalogo'],
        area: 'Catalogo'
    },
    {
        username: 'c.rodriguez',
        email: 'c.rodriguez@fernorte.com',
        password: 'compras2023',
        role: ['Encargado de compras'],
        area: 'Compras'
    },
    {
        username: 'c.lopez',
        email: 'c.lopez@fernorte.com',
        password: 'compras2023',
        role: ['Empleado de compras'],
        area: 'Compras'
    },
    {
        username: 's.herrera',
        email: 's.herrera@fernorte.com',
        password: 'inventario2023',
        role: ['Supervisor', 'Superviso', 'Encargado de inventario'],
        area: 'Inventario'
    },
    {
        username: 'v.gomez',
        email: 'v.gomez@fernorte.com',
        password: 'ventas2023',
        role: ['Cajero', 'Vendedor', 'Encargado de ventas'],
        area: 'Ventas'
    },
    {
        username: 'l.fernandez',
        email: 'l.fernandez@fernorte.com',
        password: 'clientes2023',
        role: ['Administración'],
        area: 'Sistemas'
    },
]