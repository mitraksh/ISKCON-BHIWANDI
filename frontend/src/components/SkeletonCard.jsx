import { Card, CardContent, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
}
