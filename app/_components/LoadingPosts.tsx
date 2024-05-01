import { CircularProgress } from "@mui/material";

export default function LoadingPosts() {
  return (
    <div style={{ marginTop: '100px', height: '100vh' }}>
      <CircularProgress
        size={'100px'} />
    </div>
  );
}