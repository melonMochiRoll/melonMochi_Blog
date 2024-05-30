import { ImageResponse } from 'next/og'
 
export const runtime = 'edge';
export const alt = "melonmochi's blog";
export const size = {
  width: 640,
  height: 480,
};
export const contentType = 'image/png';
 
export default async function Image() {
  const pretendardBlack = fetch(
    new URL('/public/fonts/Pretendard-Black.subset.woff2', import.meta.url)
  ).then((res) => res.arrayBuffer());
 
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        MELONMOCHI
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Pretendard-Black',
          data: await pretendardBlack,
        },
      ],
    }
  )
}