import { MaterialIcons ,FontAwesome} from '@expo/vector-icons';

export interface Menu {
    text: string;
    icon: keyof typeof MaterialIcons.glyphMap | keyof typeof FontAwesome.glyphMap;
    to: string;
    link: boolean
    auth?: boolean
}


export const menuHomeScreen: Menu[] = [
    {
        text: 'Ubicacion',
        icon: 'location-on',
        to: 'https://www.360virtualbo.com/tour/educacion/updstarija',
        link: true
    },
    {
        text: 'Comunicados',
        icon: 'forum',
        to: '/comunicados',
        link: false
    },
    {
        text: 'Redes Sociales',
        icon: 'groups',
        to: '/redes-sociales',
        link: false
    },
    {
        text: 'UPDS Responde',
        icon: 'device-unknown',
        to: '/chat',
        link: false
    },
    {
        text: 'Test Vocacional',
        icon: 'engineering',
        to: '/test-vocacional',
        link: false
    },
    {
        text: 'Calendario Academico',
        icon: 'calendar-today',
        to: '/calendario-academico',
        link: false,
        auth: false
    },
]

export const menuHomeStudent: Menu[] = [
    {
        text: 'Plataforma Moodle',
        icon: 'laptop-mac',
        to: '/moodle',
        link: false
    },
    {
        text: 'Updsnet',
        icon: 'language',
        to: '/updsnet',
        link: false
    },
    {
        text: 'Ayuda',
        icon: 'help-outline',
        to: '/ayuda',
        link: false
    },
    {
        text: 'Bliblioteca UPDS',
        icon: 'auto-stories',
        to: '/biblioteca',
        link: false
    },
    {
        text: 'Proyecciones',
        icon: 'table-view',
        to: '/proyecciones2',
        link: false,
        auth: true
    },
    /*   {
          text: 'TESTING',
          icon: 'table-view',
          to: 'TestearUpdsScreen',
          link: false
      }, */
    {
        text: 'Registro Historico',
        icon: 'account-tree',
        to: '/historico-materias',
        link: false,
        auth:true
    },
   
]

export const menuAjustes: Menu[] = [
    {
        icon: "user-circle",
        text: "Mi perfil",
        to: "perfil",
        link: false,
        auth:true
    },
    {
        icon: "notifications",
        text: "Notificaciones",
        to: "notificacionConfig",
        link: false
    },
    {
        icon: "grid-view",
        text: "Tutoriales",
        to: "tutorialConfig",
        link: false
    },
    {
        icon: "moon-o",
        text: "Tema",
        to: "tema",
        link: false
    },
    {
        icon: "article",
        text: "Terminos de uso",
        to: "terminos",
        link: false
    },
    {
        //@ts-ignore
        icon: "shield-check",
        text: "Politica de Privacidad",
        to: "politica",
        link: false
    },
    {
        icon: "info-circle",
        text: "Acerca de",
        to: "about",
        link: false
    }
]