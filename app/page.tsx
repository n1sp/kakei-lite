// app/page.tsx
import { redirect } from "next/navigation";

export default async function Home() {
  const isLoggedIn = false; // ← セッション確認処理に置き換える

  if (!isLoggedIn) {
    redirect("/login");
  }else{
    redirect("/expense");
  }
}
