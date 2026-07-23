type BadgeVariant = 'pending' | 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-orange-50 text-orange-700 border border-orange-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  default: 'bg-gray-50 text-gray-700 border border-gray-200',
};

export function estadoToVariant(estado: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pendiente: 'pending',
    aprobada: 'success',
    vencida: 'danger',
    en_produccion: 'info',
    terminado: 'success',
    entregado: 'default',
  };
  return map[estado] || 'default';
}

export default function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${variantStyles[variant]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        variant === 'success' ? 'bg-emerald-500' :
        variant === 'pending' ? 'bg-amber-500' :
        variant === 'danger' ? 'bg-red-500' :
        variant === 'info' ? 'bg-blue-500' :
        variant === 'warning' ? 'bg-orange-500' :
        'bg-gray-500'
      }`} />
      {children.replace(/_/g, ' ')}
    </span>
  );
}
