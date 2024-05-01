import CustomMDX from "@/App/post/[tag]/[fileName]/_components/CustomMDX";
import { Suspense } from "react";
import Loading from "@/App/post/[tag]/[fileName]/loading";

type TPostPageProps = {
  params: {
    tag: string,
    fileName: string,
  },
};

export default function PostPage({
  params,
}: TPostPageProps) {
  const { tag, fileName } = params;

  return (
    <Suspense fallback={<Loading />}>
      <CustomMDX
        tag={tag}
        fileName={fileName} />
    </Suspense>
  );
}