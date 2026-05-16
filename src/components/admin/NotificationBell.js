"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, HandCoins, UserPlus, Shield, X, CheckCheck } from "lucide-react";
import { getNotifications, markNotificationsSeen } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const POLL_INTERVAL_MS = 30_000;

const typeIcons = {
  donation: { icon: HandCoins, color: "text-green-600 bg-green-50" },
  invite: { icon: UserPlus, color: "text-yellow-600 bg-yellow-50" },
  team: { icon: Shield, color: "text-blue-600 bg-blue-50" },
};

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/**
 * Plays a short two-note "ding" using the Web Audio API.
 * No external audio asset needed.
 */
function playNotificationSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    const play = (freq, start, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.18, now + start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.05);
    };

    play(880, 0, 0.18); // A5
    play(1318.5, 0.12, 0.22); // E6

    setTimeout(() => ctx.close(), 700);
  } catch (e) {
    // Audio blocked or unsupported — silently ignore
  }
}

export default function NotificationBell() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const previousUnreadRef = useRef(0);
  const hasInitializedRef = useRef(false);

  const fetchNotifications = useCallback(async (playSoundOnNew = true) => {
    try {
      const data = await getNotifications();
      const fetched = data.notifications || [];
      const newCount = data.unreadCount || 0;
      setNotifications(fetched);
      setUnreadCount(newCount);

      if (
        playSoundOnNew &&
        hasInitializedRef.current &&
        newCount > previousUnreadRef.current
      ) {
        playNotificationSound();
      }
      previousUnreadRef.current = newCount;
      hasInitializedRef.current = true;
    } catch (e) {
      // network blip — keep current state
    }
  }, []);

  // Poll while authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchNotifications(false);
    const id = setInterval(fetchNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isAuthenticated, fetchNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleToggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && unreadCount > 0) {
      try {
        setLoading(true);
        await markNotificationsSeen();
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
        previousUnreadRef.current = 0;
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavigate = (link) => {
    setOpen(false);
    if (link) router.push(link);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              Notifications
              {loading && <span className="text-xs text-gray-400">syncing...</span>}
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-gray-400">
                <CheckCheck className="mx-auto mb-2 text-gray-300" size={28} />
                You're all caught up.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map((n) => {
                  const meta = typeIcons[n.type] || { icon: Bell, color: "text-gray-600 bg-gray-50" };
                  const Icon = meta.icon;
                  return (
                    <li key={n.id}>
                      <button
                        onClick={() => handleNavigate(n.link)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-start gap-3 ${n.unread ? "bg-blue-50/30" : ""}`}
                      >
                        <span className={`p-2 rounded-full flex-shrink-0 ${meta.color}`}>
                          <Icon size={16} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                          <p className="text-xs text-gray-500 truncate">{n.body}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{timeAgo(n.createdAt)}</p>
                        </div>
                        {n.unread && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
