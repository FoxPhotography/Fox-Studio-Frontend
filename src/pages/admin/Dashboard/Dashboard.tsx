import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services';
import { BookOpen, ImageIcon, MessageSquare, DollarSign, Activity, Clock, Loader2 } from 'lucide-react';

interface DashboardStats {
  stories: number;
  portfolio: number;
  reviews: number;
  packages: number;
}

interface ActivityLog {
  _id: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getActivity(8),
        ]);
        setStats((statsRes as any).data || statsRes);
        setActivities((activityRes as any).data || activityRes || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  const statCards = [
    { title: 'Stories', value: stats?.stories || 0, Icon: BookOpen, color: 'text-blue-500' },
    { title: 'Portfolio Items', value: stats?.portfolio || 0, Icon: ImageIcon, color: 'text-purple-500' },
    { title: 'Reviews', value: stats?.reviews || 0, Icon: MessageSquare, color: 'text-green-500' },
    { title: 'Packages', value: stats?.packages || 0, Icon: DollarSign, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="font-display text-3xl font-bold text-[#F8F8F8]">Overview</h1>
        <p className="text-sm text-[#8A8A8A] mt-1">
          Welcome back. Here is the current status of your digital showroom.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="p-6 bg-[#111111] border border-[#232323] rounded-sm flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#555555] uppercase tracking-wider block">
                {card.title}
              </span>
              <span className="text-3xl font-display font-bold text-[#F8F8F8] block">
                {card.value}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#161616] border border-[#232323] flex items-center justify-center text-[#D4AF37]">
              <card.Icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="bg-[#111111] border border-[#232323] rounded-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={18} className="text-[#D4AF37]" />
          <h2 className="text-lg font-semibold text-[#F8F8F8]">Audit Activity Log</h2>
        </div>

        {activities.length === 0 ? (
          <p className="text-sm text-[#555555] py-8 text-center italic">
            No console activity logs found.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start justify-between p-4 bg-[#0A0A0A]/50 border border-[#232323]/50 rounded-sm hover:border-[#D4AF37]/10 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    {activity.action.replace('_', ' ')}
                  </span>
                  <p className="text-sm text-[#8A8A8A]">{activity.details}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#555555] shrink-0">
                  <Clock size={12} />
                  <span>{new Date(activity.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
