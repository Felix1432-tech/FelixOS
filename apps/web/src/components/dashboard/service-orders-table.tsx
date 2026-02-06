'use client';

import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useState } from 'react';

interface ServiceOrder {
  id: string;
  number: number;
  customer: string;
  vehicle: string;
  plate: string;
  status: 'DRAFT' | 'DIAGNOSING' | 'QUOTING' | 'WAITING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'QUALITY_CHECK' | 'COMPLETED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  createdAt: string;
}

const statusConfig: Record<ServiceOrder['status'], { label: string; className: string }> = {
  DRAFT: { label: 'Rascunho', className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  DIAGNOSING: { label: 'Diagnóstico', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  QUOTING: { label: 'Orçamento', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  WAITING_APPROVAL: { label: 'Aguardando', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  APPROVED: { label: 'Aprovado', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  IN_PROGRESS: { label: 'Em Manutenção', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  QUALITY_CHECK: { label: 'Revisão', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  COMPLETED: { label: 'Concluído', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  DELIVERED: { label: 'Entregue', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  CANCELLED: { label: 'Cancelado', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

// Mock data - Em produção, isso viria da API
const mockOrders: ServiceOrder[] = [
  {
    id: '1',
    number: 1001,
    customer: 'João Silva',
    vehicle: 'Honda Civic 2020',
    plate: 'ABC1D23',
    status: 'IN_PROGRESS',
    total: 1850.00,
    createdAt: '2026-02-05',
  },
  {
    id: '2',
    number: 1002,
    customer: 'Maria Santos',
    vehicle: 'Toyota Corolla 2019',
    plate: 'XYZ9A87',
    status: 'WAITING_APPROVAL',
    total: 3200.00,
    createdAt: '2026-02-05',
  },
  {
    id: '3',
    number: 1003,
    customer: 'Carlos Oliveira',
    vehicle: 'Volkswagen Golf 2021',
    plate: 'QWE4R56',
    status: 'COMPLETED',
    total: 890.00,
    createdAt: '2026-02-04',
  },
  {
    id: '4',
    number: 1004,
    customer: 'Ana Costa',
    vehicle: 'Chevrolet Onix 2022',
    plate: 'RTY7U89',
    status: 'DIAGNOSING',
    total: 0,
    createdAt: '2026-02-05',
  },
  {
    id: '5',
    number: 1005,
    customer: 'Pedro Souza',
    vehicle: 'Fiat Argo 2023',
    plate: 'IOP1L23',
    status: 'DELIVERED',
    total: 2450.00,
    createdAt: '2026-02-03',
  },
];

export function ServiceOrdersTable() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Ordens de Serviço Recentes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Últimas ordens de serviço da oficina
          </p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          + Nova O.S.
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th className="px-6 py-3">O.S.</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Veículo</th>
              <th className="px-6 py-3">Placa</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                      #{order.number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {order.customer}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {order.vehicle}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {order.plate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {order.total > 0 ? formatCurrency(order.total) : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {openMenu === order.id && (
                        <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
                            <Eye className="h-4 w-4" />
                            Visualizar
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
                            <Edit className="h-4 w-4" />
                            Editar
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Mostrando 5 de 24 resultados
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Anterior
          </button>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
