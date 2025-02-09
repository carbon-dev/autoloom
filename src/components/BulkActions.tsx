import React from 'react';
import { Trash2, Download } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onDownload: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onDelete,
  onDownload,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg border border-gray-100 py-3 px-4 flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {selectedCount} image{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <div className="h-4 w-px bg-gray-200" />
        <button
          onClick={onDownload}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}; 