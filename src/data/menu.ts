import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Route } from "expo-router";
export interface Menu {
  text: string;
  icon:
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap
    | keyof typeof AntDesign.glyphMap;
  to: Route<string>;
  link: boolean;
  auth?: boolean;
}

export const menuHomeScreen: Menu[] = [
  {
    text: "UPDS Tarija",
    icon: "institution",
    //  to: 'https://www.360virtualbo.com/tour/educacion/updstarija',
    to: "/upds/",
    link: false,
  },
  {
    text: "Comunicados",
    icon: "forum",
    to: "/announcements/",
    link: false,
  },
  {
    text: "Redes Sociales",
    icon: "groups",
    to: "/social-networks/",
    link: false,
  },
  {
    text: "UPDS Responde",
    icon: "device-unknown",
    to: "/upds-responde/",
    link: false,
  },
  /*   {
          text: 'Test Vocacional',
          icon: 'engineering',
          to: '/test-vocacional',
          link: false
      }, */
  {
    text: "Calendario Académico",
    icon: "calendar",
    to: "/academic-calendar/",
    link: false,
    auth: false,
  },
];

export const menuHomeStudent: Menu[] = [
  {
    text: "Plataforma Moodle",
    icon: "laptop-mac",
    to: "/web/moodle/",
    link: false,
  },
  {
    text: "Registro y Pagos",
    icon: "CodeSandbox",
    to: "/services/",
    link: false,
  },
  {
    text: "Ayuda",
    icon: "help-outline",
    to: "/help/",
    link: false,
  },
  {
    text: "Bliblioteca UPDS",
    icon: "auto-stories",
    to: "/web/e-libro/",
    link: false,
    auth: true,
  },
  {
    text: "Proyecciones",
    icon: "table-view",
    to: "/projections/projection-stament",
    link: false,
    auth: true,
  },
  /*   {
          text: 'TESTING',
          icon: 'table-view',
          to: 'TestearUpdsScreen',
          link: false
      }, */
  {
    text: "Registro Histórico",
    icon: "account-tree",
    to: "/historical-academic/",
    link: false,
    auth: true,
  },
  /*     {
            text: 'Registro de Materia',
            icon: 'build',
            to: '/registro-materia',
            link: false,
            auth: true
        }, */
];

export const menuAjustes: Menu[] = [
  {
    icon: "user-circle",
    text: "Mi perfil",
    to: "profile",
    link: false,
    auth: true,
  },
  {
    icon: "notifications",
    text: "Notificaciones",
    to: "config/notifications",
    link: false,
  },
  {
    icon: "grid-view",
    text: "Tutoriales, Guías, Avisos, etc.",
    to: "config/guides",
    link: false,
  },
  {
    icon: "moon-o",
    text: "Tema",
    to: "config/theme",
    link: false,
  },
  {
    icon: "article",
    text: "Terminos de Uso",
    to: "config/terms-of-service",
    link: false,
  },
  {
    //@ts-ignore
    icon: "shield-check",
    text: "Política de Privacidad",
    to: "config/privacy-policy",
    link: false,
  },
  {
    icon: "info-circle",
    text: "Acerca de la aplicación",
    to: "config/about",
    link: false,
  },
  {
    icon: "info-circle",
    text: "Developer",
    to: "config/developer",
    link: false,
  },
];
