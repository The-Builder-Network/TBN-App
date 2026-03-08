import React from 'react';
import Badge from '../ui/Badge';

interface StatusBadgeProps {
  status: string;
}

const statusMap: Record<string, { label: string; variant: 'success' | 'secondary' | 'warning' | 'destructive' | 'info' | 'default' | 'outline' }> = {
  active: { label: 'Active', variant: 'success' },
  closed: { label: 'Closed', variant: 'secondary' },
  pending: { label: 'Pending', variant: 'warning' },
  interested: { label: 'Interested', variant: 'info' },
  hired: { label: 'Hired', variant: 'default' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status.toLowerCase()] ?? { label: status, variant: 'secondary' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
