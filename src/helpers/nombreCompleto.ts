import { IUser } from "@/types";

export const nombreCompleto = (user: IUser)  => `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`