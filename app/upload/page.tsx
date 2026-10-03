export default function UploadPage() {
  return (
   <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Organization Intelligence
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Upload Center
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Upload organizational data and documents to keep SignalOps
          intelligence up to date.
        </p>
      </section>

      {/* Upload Area */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-blue-400 hover:bg-blue-50/30">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 16V4m0 0L8 8m4-4l4 4M5 20h14"
              />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Upload organizational files
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Drag and drop your files here, or select files from your computer.
          </p>

          <button className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
            Select Files
          </button>

          <p className="mt-4 text-xs text-slate-400">
            Supported formats: CSV, XLSX, PDF, DOCX
          </p>
        </div>
      </section>

      {/* Upload Categories */}
      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M17 20h5V4H2v16h5m10 0v-5H7v5m10 0H7"
              />
            </svg>
          </div>

          <h3 className="font-semibold text-slate-900">
            Employee Data
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Import employee profiles, workload, performance, and status data.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 17v-6m3 6V7m3 10v-3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h3 className="font-semibold text-slate-900">
            Operational Reports
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Upload reports used for organizational and operational analysis.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M7 3h8l4 4v14H7a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M15 3v5h5M9 13h6M9 17h6"
              />
            </svg>
          </div>

          <h3 className="font-semibold text-slate-900">
            Documents
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add company documents and reference material for analysis.
          </p>
        </div>
      </section>

      {/* Recent Uploads */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Uploads
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently added organizational files.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">
                CSV
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  employee-data.csv
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Employee Intelligence • Processed
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Processed
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700">
                XLS
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  operations-report.xlsx
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Operational Analysis • Processed
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Processed
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xs font-bold text-purple-700">
                PDF
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  quarterly-review.pdf
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Company Report • Processing
                </p>
              </div>
            </div>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              Processing
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}