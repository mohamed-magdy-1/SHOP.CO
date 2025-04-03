import { NextResponse } from 'next/server';

export async function middleware(req) {
  const backendUrl = 'https://shop-co-back-end.onrender.com/api/header'; // ضع رابط Strapi
  const timeout = 5000; // 5 ثوانٍ كحد أقصى

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(backendUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('Backend Down');
    return NextResponse.next(); // السماح بالتحميل إذا كان السيرفر يعمل
  } catch (error) {
    console.error("Backend is down:", error.message);
    return NextResponse.rewrite(new URL('/server-down', req.url)); // توجيه المستخدم لصفحة الخطأ
  }
}

export const config = {
  matcher: '/((?!server-down).*)', // استثناء صفحة السيرفر المعطل
};
