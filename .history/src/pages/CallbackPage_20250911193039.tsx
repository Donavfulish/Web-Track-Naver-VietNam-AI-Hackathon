import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase sẽ tự động xử lý session từ URL fragment
    // Sau đó, chúng ta sẽ kiểm tra session và chuyển hướng
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (session) {
        // Sau khi đăng nhập thành công, chuyển hướng đến Dashboard
        navigate('/dashboard', { replace: true });
      } else {
        // Nếu không có session (có thể có lỗi hoặc người dùng hủy), về trang chủ
        navigate('/', { replace: true });
      }
    }).catch((err) => {
      console.error("Error in CallbackPage:", err);
      // Xử lý lỗi nếu có
      navigate('/', { replace: true });
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">Đang xử lý đăng nhập...</p>
    </div>
  );
}