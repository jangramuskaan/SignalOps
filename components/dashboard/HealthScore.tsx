import { Card, CardContent } from "@/components/ui/card";

export default function HealthScore() {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">
          Company Health
        </h2>

        <div className="mt-6 text-center">
          <p className="text-6xl font-bold text-green-600">
            87%
          </p>

          <p className="mt-2 text-gray-500">
            Healthy
          </p>

          <p className="mt-4 text-sm text-green-600">
            ▲ +4% this week
          </p>
        </div>
      </CardContent>
    </Card>
  );
}