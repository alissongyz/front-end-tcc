import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Medicamentos',
        path: '/medicines',
        icon: <RiIcons.RiDashboardLine />,
    },
    {
        title: 'Materiais',
        path: '/material',
        icon: <AiIcons.AiOutlineLayout />,
    },
    {
        title: 'Usuários',
        path: '/users',
        icon: <AiIcons.AiOutlineUsergroupAdd />,
    },
    {
        title: 'Painel Aprovação de saídas',
        path: '/teste',
        icon: <AiIcons.AiOutlineProject />,
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