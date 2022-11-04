import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as TbIcons from 'react-icons/tb';
import * as FiIcons from 'react-icons/fi';

export const SideBarData = [
    // {
    //     title: 'Dashboard',
    //     path: '/dashboard',
    //     icon: <AiIcons.AiOutlineLineChart />,
    // },
    {
        title: 'Usuários',
        path: '/users',
        icon: <FiIcons.FiUsers />,
        access: 'admin'
    },
    {
        title: 'Materiais',
        path: '/material',
        icon: <BsIcons.BsBoxSeam />,
        access: 'any'
    },
    {
        title: 'Medicamentos',
        path: '/medicine',
        icon: <GiIcons.GiMedicines />,
        access: 'any'
    },
    {
        title: 'Pedidos Pendentes',
        path: '/consult-order',
        icon: <BsIcons.BsFileEarmarkText />,
        access: 'farmaceutico'
    },
    // {
    //     title: 'Registro de Saídas',
    //     path: '/teste2',
    //     icon: <AiIcons.AiOutlineSolution />,
    // },
    // {
    //     title: 'Correios',
    //     path: '/correios',
    //     icon: <TbIcons.TbTruckDelivery />,
    // },
    {
        title: 'Criar Pedido',
        path: '/ask',
        icon: <TbIcons.TbTruckDelivery />,
        access: 'veterinario'
    },
    {
        title: 'Configurações',
        path: '/settings',
        icon: <FiIcons.FiSettings />,
        access: 'any'
    },
    {
        title: 'Sair',
        path: '/',
        icon: <BiIcons.BiLogOut />,
        access: 'any'
    }
]