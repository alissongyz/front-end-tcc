import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';

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
        icon: <IoIcons.IoIosDocument />,
    },
    {
        title: 'Painel Aprovação de saídas',
        path: '/teste',
        icon: <IoIcons.IoIosDocument />,
    },
    {
        title: 'Registro de Saídas',
        path: '/teste2',
        icon: <IoIcons.IoIosDocument />,
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