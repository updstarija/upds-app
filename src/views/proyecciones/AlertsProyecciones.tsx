import React from "react";
import { AlertCard } from "@/components";
import { useAuth } from "@/hooks";
import { useAppStore } from "@/store/use-app-store";

const AlertsProyecciones = () => {
	const { user } = useAuth();
	const { isEnabledProjections } = useAppStore();

	const isIrregular = user.irregular;

	return (
		<>
			{isIrregular && (
				<AlertCard
					variant="warning"
					content="Actualmente, la proyección de materias no está disponible para estudiantes irregulares que realizaron convalidación de materias. Estamos trabajando en habilitar esta función. Gracias por su comprensión."
					header="Proyección de Materias para Estudiantes Irregulares"
				/>
			)}

			{!isEnabledProjections && (
				<AlertCard
					variant="info"
					content="Actualmente, la proyección de materias no está disponible. estamos trabajando para traerte la oferta del proximo semetre. Volveremos Pronto"
					header="Proyección de Materias"
				/>
			)}
		</>
	);
};

export default AlertsProyecciones;
