"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Car,
  ClipboardList,
  Clock,
  Plus,
  ArrowRight,
  Mic,
  TrendingUp,
  DollarSign,
  Wrench,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { tenantsApi, serviceOrdersApi } from "@/lib/api";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Stats {
  customers: number;
  vehicles: number;
  serviceOrders: number;
  pendingOrders: number;
}

interface ServiceOrder {
  id: string;
  number: number;
  status: string;
  totalPrice: number;
  createdAt: string;
  customer: { name: string };
  vehicle: { plate: string; brand: string; model: string };
}

const statusConfig: Record<string, { label: string; className: string }> = {
  DRAFT: { label: "Rascunho", className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  DIAGNOSING: { label: "Diagnóstico", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  QUOTING: { label: "Orçamento", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  WAITING_APPROVAL: { label: "Aguardando", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  APPROVED: { label: "Aprovado", className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
  IN_PROGRESS: { label: "Em Manutenção", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  QUALITY_CHECK: { label: "Revisão", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  COMPLETED: { label: "Concluído", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  DELIVERED: { label: "Entregue", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  CANCELLED: { label: "Cancelado", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          tenantsApi.getStats(),
          serviceOrdersApi.getAll(),
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Bem-vindo de volta! Aqui está o resumo da sua oficina.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/diagnostics">
            <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-700">
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">Diagnóstico por Voz</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards - Modern Style */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Faturamento Mensal
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                R$ 45.231
              </p>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600">+12.5%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">vs mês anterior</span>
              </div>
            </div>
            <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Cars in Shop */}
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Carros na Oficina
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats?.pendingOrders || 0}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <Wrench className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-slate-500 dark:text-slate-400">em manutenção</span>
              </div>
            </div>
            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
              <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Open Service Orders */}
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                O.S. Abertas
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats?.serviceOrders || 0}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-slate-500 dark:text-slate-400">{stats?.pendingOrders || 0} aguardando</span>
              </div>
            </div>
            <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
              <ClipboardList className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Total Customers */}
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Clientes Ativos
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats?.customers || 0}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-600">+3</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">esta semana</span>
              </div>
            </div>
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>

      {/* Recent Orders Table */}
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
          <Link href="/dashboard/service-orders">
            <Button variant="outline" size="sm" className="gap-2">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Table */}
        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
              Nenhuma ordem de serviço
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Comece criando sua primeira ordem de serviço.
            </p>
            <Link href="/dashboard/service-orders/new">
              <Button className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Nova O.S.
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="px-6 py-3">O.S.</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Veículo</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = statusConfig[order.status] || statusConfig.DRAFT;
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
                          {order.customer.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {order.vehicle.brand} {order.vehicle.model}
                          </span>
                          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400 w-fit mt-1">
                            {order.vehicle.plate}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                            status.className
                          )}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {Number(order.totalPrice) > 0 ? formatCurrency(Number(order.totalPrice)) : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {formatDateTime(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/service-orders/${order.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
