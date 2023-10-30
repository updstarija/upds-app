import { IMenu } from "@/types/menu";

export const menuFacultades: IMenu[] = [
    {
        label: "Facultades",
        items: [
            {
                label: "Ciencias Jurídicas",
                items: [
                    { label: "Derecho", link: "/carrera/derecho-tarija", icon: "book" },
                    {
                        label: "Derecho Semipresencial",
                        link: "/carrera/derecho-tarija-semipresencial",
                        icon: "book",
                    },
                ],
                icon: "folder-table",
            },
            {
                label: "Ciencias Empresariales",
                items: [
                    {
                        label: "Administración de Empresas",
                        link: "/carrera/administracion-de-empresas-tarija",
                        icon: "book",
                    },
                    {
                        label: "Administración de Empresas Semipresencial",
                        link: "/carrera/administracion-de-empresas-tarija-semipresencia",
                        icon: "book",
                    },
                    {
                        label: "Contaduría Pública",
                        link: "/carrera/contaduria-publica-tarija",
                        icon: "book",
                    },
                    {
                        label: "Ingeniería Comercial",
                        link: "/carrera/ingenieria-comercial-tarija",
                        icon: "book",
                    },
                    {
                        label: "Ingeniería Comercial Semipresencial",
                        link: "/carrera/ingenieria-comercial-tarija-semipresencia",
                        icon: "book",
                    },
                ],
                icon: "folder-table",
            },
            {
                label: "Ciencias Sociales",
                items: [
                    {
                        label: "Ciencias de la Comunicación Social",
                        link: "/carrera/ciencias-de-la-comunicacion-social-tarija",
                        icon: "book",
                    },
                    {
                        label: "Ciencias de la Comunicación Social Semipresencial",
                        link: "/carrera/ciencias-de-la-comunicacion-social-tarija-semipresencial",
                        icon: "book",
                    },
                    {
                        label: "Psicología",
                        link: "/carrera/psicologia-tarija",
                        icon: "book",
                    },
                    {
                        label: "Psicología Semipresencial",
                        link: "/carrera/psicologia-tarija-semipresencial",
                        icon: "book",
                    },
                ],
                icon: "folder-table",
            },
            {
                label: "Ingeniería",
                items: [
                    { label: "Ingeniería Civil", link: "/carrera/ingenieria-civil-tarija", icon: "book" },
                    { label: "Ingeniería de Sistemas", link: "/carrera/ingenieria-de-sistemas-tarija", icon: "book" },
                    {
                        label: "Ingeniería en Gestión Ambiental",
                        link: "/carrera/ingenieria-en-gestion-ambiental-tarija",
                        icon: "book",
                    },
                    {
                        label: "Ingeniería en Redes y Telecomunicaciones",
                        link: "/carrera/ingenieria-en-redes-y-telecomunicaciones-tarija",
                        icon: "book",
                    },
                    { label: "Ingeniería Industrial", link: "/carrera/ingenieria-industrial-tarija", icon: "book" },
                ],
                icon: "folder-table",
            },
            {
                label: "Semiprensenciales",
                items: [
                    { label: "Derecho", link: "/carrera/derecho-tarija-semipresencial", icon: "book" },
                    { label: "Adm Empresas", link: "/carrera/administracion-de-empresas-tarija-semipresencial", icon: "book" },
                    {
                        label: "Ingeniería Comercial",
                        link: "/carrera/ingenieria-comercial-tarija",
                        icon: "book",
                    },
                    {
                        label: "Ciencias de la Comunicación Social",
                        link: "/carrera/ciencias-de-la-comunicacion-social-tarija",
                        icon: "book",
                    },
                    {
                        label: "Psicología",
                        link: "/carrera/psicologia-tarija",
                        icon: "book",
                    },
                ],
                icon: "folder-table",
            },
        ],
        icon: "home-group",
    },
];