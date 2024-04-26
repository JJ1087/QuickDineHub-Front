export interface Producto {
  _id:string
  idRestaurante: string
  imagen: []
  nombre: string
  descripcion: string
  categoria: string
  tiempoP: number
  precio: {
    $numberDecimal: string
  }
  etiquetas: []
  oferta: string,
  costoEnvio: {
    $numberDecimal: string
  }
  descuento: {
    $numberDecimal: string
  },
  createdAt: string
  updatedAt: string
}
