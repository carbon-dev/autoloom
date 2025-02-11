import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../shared/Button';
import { Badge } from '../../shared/Badge';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

export const BillingHistory: React.FC = () => {
  const [invoices] = React.useState<Invoice[]>([
    {
      id: 'INV-001',
      date: '2024-01-01',
      amount: '$19.00',
      status: 'paid',
      downloadUrl: '#',
    },
    {
      id: 'INV-002',
      date: '2023-12-01',
      amount: '$19.00',
      status: 'paid',
      downloadUrl: '#',
    },
    {
      id: 'INV-003',
      date: '2023-11-01',
      amount: '$19.00',
      status: 'paid',
      downloadUrl: '#',
    },
  ]);

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
        Billing History
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={
                      invoice.status === 'paid'
                        ? 'success'
                        : invoice.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Download className="h-4 w-4" />}
                    href={invoice.downloadUrl}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 