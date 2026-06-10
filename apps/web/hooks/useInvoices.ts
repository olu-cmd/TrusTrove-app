import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInvoices, getInvoiceByID, createInvoice } from '@/lib/api';
import { InvoiceClient, PoolClient } from '@trusttrove/sdk';
import { useWalletStore } from '@/store/wallet';

const invoiceContractID = process.env.NEXT_PUBLIC_INVOICE_CONTRACT_ID || '';
const poolContractID = process.env.NEXT_PUBLIC_POOL_CONTRACT_ID || '';

export function useInvoices(filters?: { status?: string; issuer?: string }) {
  const queryClient = useQueryClient();
  const { address } = useWalletStore();

  const invoicesQuery = useQuery({
    queryKey: ['invoices', filters],
    queryFn: () => getInvoices(filters),
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async ({ buyer, faceValue, dueDate }: { buyer: string; faceValue: string; dueDate: number }) => {
      return createInvoice(buyer, faceValue, dueDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });

  const listInvoiceMutation = useMutation({
    mutationFn: async ({ invoiceId, discountBps }: { invoiceId: string; discountBps: number }) => {
      if (!address) throw new Error('Wallet not connected');
      const invoiceClient = new InvoiceClient(invoiceContractID);
      return invoiceClient.listForFinancing(invoiceId, discountBps, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });

  const fundInvoiceMutation = useMutation({
    mutationFn: async ({ invoiceId }: { invoiceId: string }) => {
      if (!address) throw new Error('Wallet not connected');
      const poolClient = new PoolClient(poolContractID);
      return poolClient.fundInvoice(invoiceId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['poolStats'] });
      queryClient.invalidateQueries({ queryKey: ['lpPosition', address] });
    },
  });

  const shipInvoiceMutation = useMutation({
    mutationFn: async ({ invoiceId }: { invoiceId: string }) => {
      if (!address) throw new Error('Wallet not connected');
      const invoiceClient = new InvoiceClient(invoiceContractID);
      return invoiceClient.markShipped(invoiceId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });

  const confirmDeliveryMutation = useMutation({
    mutationFn: async ({ invoiceId }: { invoiceId: string }) => {
      if (!address) throw new Error('Wallet not connected');
      const invoiceClient = new InvoiceClient(invoiceContractID);
      return invoiceClient.confirmDelivery(invoiceId, address, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });

  const repayInvoiceMutation = useMutation({
    mutationFn: async ({ invoiceId }: { invoiceId: string }) => {
      if (!address) throw new Error('Wallet not connected');
      const invoiceClient = new InvoiceClient(invoiceContractID);
      return invoiceClient.repay(invoiceId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['poolStats'] });
      queryClient.invalidateQueries({ queryKey: ['lpPosition', address] });
    },
  });

  const defaultInvoiceMutation = useMutation({
    mutationFn: async ({ invoiceId }: { invoiceId: string }) => {
      if (!address) throw new Error('Wallet not connected');
      const invoiceClient = new InvoiceClient(invoiceContractID);
      return invoiceClient.triggerDefault(invoiceId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['poolStats'] });
      queryClient.invalidateQueries({ queryKey: ['lpPosition', address] });
    },
  });

  return {
    invoices: invoicesQuery.data || [],
    isLoading: invoicesQuery.isLoading,
    error: invoicesQuery.error,
    refetch: invoicesQuery.refetch,

    createInvoice: createInvoiceMutation.mutateAsync,
    isCreating: createInvoiceMutation.isPending,
    createError: createInvoiceMutation.error,

    listInvoice: listInvoiceMutation.mutateAsync,
    isListing: listInvoiceMutation.isPending,
    listError: listInvoiceMutation.error,

    fundInvoice: fundInvoiceMutation.mutateAsync,
    isFunding: fundInvoiceMutation.isPending,
    fundError: fundInvoiceMutation.error,

    shipInvoice: shipInvoiceMutation.mutateAsync,
    isShipping: shipInvoiceMutation.isPending,
    shipError: shipInvoiceMutation.error,

    confirmDelivery: confirmDeliveryMutation.mutateAsync,
    isConfirming: confirmDeliveryMutation.isPending,
    confirmError: confirmDeliveryMutation.error,

    repayInvoice: repayInvoiceMutation.mutateAsync,
    isRepaying: repayInvoiceMutation.isPending,
    repayError: repayInvoiceMutation.error,

    defaultInvoice: defaultInvoiceMutation.mutateAsync,
    isDefaulting: defaultInvoiceMutation.isPending,
    defaultError: defaultInvoiceMutation.error,
  };
}

export function useInvoice(id: string) {
  const invoiceQuery = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoiceByID(id),
    enabled: !!id,
  });

  return {
    invoice: invoiceQuery.data,
    isLoading: invoiceQuery.isLoading,
    error: invoiceQuery.error,
    refetch: invoiceQuery.refetch,
  };
}
