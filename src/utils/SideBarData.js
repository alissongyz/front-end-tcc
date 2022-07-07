import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineDashboard />,
    },
    {
        title: 'Usuários',
        path: '/users',
        icon: <AiIcons.AiOutlineUsergroupAdd />,
    },
    {
        title: 'Materiais',
        path: '/material',
        icon: <AiIcons.AiOutlineLayout />,
    },
    {
        title: 'Medicamentos',
        path: '/medicine',
        icon: <RiIcons.RiDashboardLine />,
    },
    {
        title: 'Pedidos Pendentes',
        path: '/consult-order',
        icon: <CgIcons.CgScreen />,
    },
    {
        title: 'Registro de Saídas',
        path: '/teste2',
        icon: <AiIcons.AiOutlineSolution />,
    },
    {
        title: 'Sobre Nós',
        path: '/aboutus',
        icon: <AiIcons.AiOutlineBook />,
    },
    {
        title: 'Contato',
        path: '/contact',
        icon: <MdIcons.MdCall />,
    }
]