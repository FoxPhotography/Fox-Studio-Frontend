import React, { useState } from 'react';
import { authService } from '../../../services';
import toast from 'react-hot-toast';
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
          <KeyRound size={28} className="text-[#D4AF37]" />
          Change Password
        </h1>
        <p className="text-sm text-[#8A8A8A] mt-1">
          Update your administrator credential for console access security.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] border border-[#232323] p-6 rounded-sm">
        {/* Current Password */}
        <div className="space-y-2">
          <label htmlFor="currentPass" className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
            Current Password
          </label>
          <input
            id="currentPass"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#232323] hover:border-[#555555] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm transition-colors duration-200 outline-none"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label htmlFor="newPass" className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
            New Password
          </label>
          <input
            id="newPass"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#232323] hover:border-[#555555] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm transition-colors duration-200 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPass" className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
            Confirm New Password
          </label>
          <input
            id="confirmPass"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#232323] hover:border-[#555555] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm transition-colors duration-200 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Updating Credential...
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              Save New Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}
