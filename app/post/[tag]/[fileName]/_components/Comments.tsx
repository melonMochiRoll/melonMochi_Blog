'use client';
 
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
 
export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
 
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
 
  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
 
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';
 
    scriptElem.setAttribute('data-repo', 'melonMochiRoll/melonMochi_Blog');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOLUn6Qw');
    scriptElem.setAttribute('data-category', 'Comments');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOLUn6Q84CfWfl');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');
 
    ref.current.appendChild(scriptElem);
  }, [theme]);
 
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);
 
  return <section
    style={{ paddingTop: '100px' }}
    ref={ref} />;
}