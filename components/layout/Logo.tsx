import { ShieldCheck } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <ShieldCheck className="h-8 w-8 text-blue-500" />

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          SignalOps
        </h1>

        <p className="text-xs text-gray-500">
          Company Intelligence
        </p>
      </div>
    </div>
  );
}