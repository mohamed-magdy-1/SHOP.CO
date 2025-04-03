import { NextResponse } from 'next/server';

export async function middleware(req) {
  const backendUrl = 'https://shop-co-back-end.onrender.com/api/hader'; // استبدل بعنوان API الخاص بك

  try {
    const res = await fetch(backendUrl);
    if (!res.ok) throw new Error('Backend Down');
    return NextResponse.next(); // السماح بالتحميل إذا كان السيرفر يعمل
  } catch (error) {
    return NextResponse.rewrite(new URL('/server-down', req.url)); // توجيه المستخدم إلى صفحة الخطأ
  }
}

export const config = {
  matcher: '/((?!server-down).*)', // استثناء صفحة السيرفر المعطل
};
