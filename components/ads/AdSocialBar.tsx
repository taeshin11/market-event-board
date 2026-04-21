'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147371.profitablecpmratenetwork.com/d4/f9/54/d4f9548531c1cd6c57030bc6a77b5fda.js", "https://pl29147374.profitablecpmratenetwork.com/01/16/b2/0116b2a47ed50d1f22edddf04c80978e.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
