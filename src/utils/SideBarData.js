import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as TbIcons from 'react-icons/tb';
import * as FiIcons from 'react-icons/fi';

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineLineChart />,
    },
    {
        title: 'Usuários',
        path: '/users',
        icon: <FiIcons.FiUsers />,
    },
    {
        title: 'Materiais',
        path: '/material',
        icon: <BsIcons.BsBoxSeam />,
    },
    {
        title: 'Medicamentos',
        path: '/medicine',
        icon: <GiIcons.GiMedicines />,
    },
    {
        title: 'Pedidos Pendentes',
        path: '/consult-order',
        icon: <BsIcons.BsFileEarmarkText />,
    },
    {
        title: 'Registro de Saídas',
        path: '/teste2',
        icon: <AiIcons.AiOutlineSolution />,
    },
    {
        title: 'Correios',
        path: '/correios',
        icon: <TbIcons.TbTruckDelivery />,
    },
    {
        title: 'Ask-Order',
        path: '/ask',
        icon: <TbIcons.TbTruckDelivery />,
    },
    {
        title: 'Configurações',
        path: '/settings',
        icon: <FiIcons.FiSettings />,
    },
    {
        title: 'Sair',
        path: '/',
        icon: <BiIcons.BiLogOut />,
    }
]