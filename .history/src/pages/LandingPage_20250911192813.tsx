import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra session khi component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard"); // Nếu đã đăng nhập, chuyển hướng đến Dashboard
      }
    });

    // Lắng nghe sự kiện thay đổi trạng thái auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session && event === "SIGNED_IN") {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      subscription?.unsubscribe(); // Hủy đăng ký listener khi component unmount
    };
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/callback", // Đường dẫn callback sau khi đăng nhập thành công
      },
    });

    if (error) {
      console.error("Error logging in with Google:", error.message);
      alert("Error logging in with Google: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI Project Planner & Task Assistant
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Giải pháp thông minh giúp sinh viên quản lý dự án, công việc cá nhân
          và cân bằng cuộc sống học tập hiệu quả. Với AI hỗ trợ tạo và sắp xếp
          task, bạn sẽ không bao giờ bỏ lỡ deadline!
        </p>
        <p className="text-md text-gray-700 mb-6">
          Vui lòng đăng nhập để tiếp tục trải nghiệm.
        </p>
        <Button
          onClick={handleGoogleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-lg flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/303102/google-g-2015-logo.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Đăng nhập bằng Google
        </Button>
      </div>
    </div>
  );
}
