import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

 

export default async function Home() {
  const session = await getServerSession(); 

  if (session) {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login'); 
  }
}
