export interface INotificacionDEPRECTATED {
  fecha: Date;
  hora: string;
  mensaje: string;
  tipo: string;
  titulo: string;
  id: string;
  type?: "read" | "delete" | "";
  to?: string;
  param?: string;
}
