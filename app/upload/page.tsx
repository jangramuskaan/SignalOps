"use client";

import { useState } from "react";

export default function UploadPage() {
  const [fileName, setFileName] = useState("");

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <section>
          <p className="text-sm font-medium text-blue-600">
            Organization Intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Upload Center
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Upload organizational datasets and documents to enrich
            SignalOps intelligence and operational analysis.
          </p>
        </section>

        {/* Upload area */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              ↑
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Upload organizational data
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add CSV, Excel, PDF, or JSON files for analysis.
            </p>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 transition hover:border-blue-400 hover:bg-blue-50/40">
              <span className="text-sm font-semibold text-slate-700">
                Click to choose a file
              </span>

              <span className="mt-2 text-xs text-slate-500">
                Supported formats: CSV, XLSX, PDF, JSON
              </span>

              <input
                type="file"
                accept=".csv,.xlsx,.xls,.pdf,.json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {fileName && (
              <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-left">
                <p className="text-xs font-medium text-blue-600">
                  Selected file
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {fileName}
                </p>
              </div>
            )}

            <button
              type="button"
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Upload & Analyze
            </button>
          </div>
        </section>

        {/* Data sources */}
        <section className="grid gap-5 md:grid-cols-3">

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-xl">
              📊
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Employee Data
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Import employee workload, performance, department,
              task, and risk information.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-xl">
              🎫
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Operational Data
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload tickets, incidents, workload reports, and
              operational activity.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-xl">
              🧠
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Intelligence Data
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Provide datasets that can be used to generate
              organizational intelligence and recommendations.
            </p>
          </div>

        </section>

        {/* Recent uploads */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Uploads
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Files recently added to the intelligence workspace.
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-slate-800">
                  employee-workload.csv
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Employee Intelligence · Processed
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Processed
              </span>
            </div>

            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-slate-800">
                  operational-tickets.csv
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Operations · Processed
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Processed
              </span>
            </div>

            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-medium text-slate-800">
                  quarterly-report.pdf
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Organization Intelligence · Pending
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Pending
              </span>
            </div>

          </div>
        </section>

        {/* Information */}
        <section className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-blue-800">
            Data Processing
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-700">
            Uploaded files can be transformed into structured
            organizational signals used across dashboards, risk
            analysis, employee intelligence, and recommendations.
          </p>
        </section>

      </div>
    </main>
  );
}