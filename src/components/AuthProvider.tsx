// src/components/AuthProvider.tsx
import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { toast, type Id } from "react-toastify";

const AUTO_LOGOUT_DURATION_MS = 12 * 60 * 60 * 1000;
const AUTO_LOGOUT_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoginTime } = useUserStore();
  const navigate = useNavigate();
  const toastIdRef = useRef<Id | null>(null);

  const handleAutoLogoutCheck = useCallback(async () => {
    const storedLoginTime = localStorage.getItem('loginTime');
    const now = Date.now();
    if (storedLoginTime) {
      const loginTimestamp = Number(storedLoginTime);
      if (now - loginTimestamp > AUTO_LOGOUT_DURATION_MS) {
        await supabase.auth.signOut();
        // onAuthStateChange sẽ xử lý việc dọn dẹp còn lại
      }
    }
  }, []); // Không cần dependency vì không dùng state/prop nào

  useEffect(() => {

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        try {
          if (session) {
            const timestamp = Date.now();
            localStorage.setItem('loginTime', timestamp.toString());
            setLoginTime(timestamp);
            setUser(session.user as any);

            // ✨ LẤY USER MỚI NHẤT TRỰC TIẾP TỪ STORE
            // Điều này tránh việc phải thêm 'user' vào dependency array
            const currentUser = useUserStore.getState().user; 
            // Chỉ upsert nếu user chưa có hoặc user thay đổi
            if (!currentUser || currentUser.id !== session.user.id) {
              const { error } = await supabase
                .from("profiles")
                .upsert(
                  {
                    name: session.user.user_metadata.full_name,
                    email: session.user.email
                  },
                  { onConflict: "email" }
                );
              if (error) console.error("Error upserting profile:", error);
            }

            if (toastIdRef.current) {
              toast.dismiss(toastIdRef.current);
              toastIdRef.current = null;
            }

            // Xử lý điều hướng
            if (event === "SIGNED_IN" && window.location.pathname === '/') {
              navigate('/for-you', { replace: true });
            } else if (event === "INITIAL_SESSION") {
              if (window.location.pathname === '/') {
                navigate('/for-you', { replace: true });
              }
            }
          } else { // session là null
            localStorage.removeItem('loginTime');
            setUser(null);

            const isProtectedPath = window.location.pathname !== '/';
            if (isProtectedPath || event === "SIGNED_OUT") {
              navigate('/', { replace: true });

              const message = event === "SIGNED_OUT" 
                ? "Phiên đăng nhập của bạn đã kết thúc." 
                : "Bạn cần đăng nhập để truy cập trang này.";

              if (!toast.isActive(toastIdRef.current as Id)) {
                  toastIdRef.current = toast.error(message);
              }
            }
          }
        } catch (error) {
          console.error("Error in onAuthStateChange:", error);
          // Xử lý lỗi chung
          await supabase.auth.signOut();
        }
      }
    );

    const intervalId = window.setInterval(handleAutoLogoutCheck, AUTO_LOGOUT_CHECK_INTERVAL_MS);

    // Hàm dọn dẹp
    return () => {
      subscription?.unsubscribe();
      clearInterval(intervalId);
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
    // ✨ DEPENDENCY ARRAY ĐÃ ĐƯỢC SỬA LẠI
    // Chỉ chứa các hàm ổn định, không thay đổi giữa các lần render
  }, [navigate, setUser, setLoginTime, handleAutoLogoutCheck]);

  return <>{children}</>;
}