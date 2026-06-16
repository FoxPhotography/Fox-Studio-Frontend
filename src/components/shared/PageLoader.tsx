import React from 'react';
import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <Loader2 size={32} className="text-[#D4AF37] animate-spin" />
    </div>
  );
}
