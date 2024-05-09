import React from "react";
import { AlertCard } from "@/components";
import { useAuth } from "@/hooks";

const AlertsProyecciones = () => {
  const { user } = useAuth();

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
    </>
  );
};

export default AlertsProyecciones;
