"use client";

import { ChangeEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";

type UploadResult = {
  success: boolean;
  filename?: string;
  file_type?: string;
  rows_processed?: number;
  columns?: string[];
  sample?: Record<string, string>[];
  analysis?: {
    rows: number;
    columns: number;
    detected_fields: string[];
    dataset_type: string;
  };
  error?: string;
};

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setError("");
  }

  function removeFile() {
    setSelectedFile(null);
    setResult(null);
    setError("");
  }

  async function uploadFile() {
    if (!selectedFile) {
      setError("Please select a CSV file first.");
      return;
    }

    setUploading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "File upload failed."
        );
      }

      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload the file."
      );
    } finally {
      setUploading(false);
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Upload Center
            </h1>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              ● Data Engine Online
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Upload operational datasets and let SignalOps analyze their
            structure automatically.
          </p>
        </div>

        {/* Upload Area */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Upload Dataset
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              CSV files are currently supported.
            </p>
          </div>

          <label
            htmlFor="dataset-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
              <UploadCloud
                size={28}
                className="text-blue-600"
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Choose a CSV dataset
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Upload employee, customer, risk, or operational data.
            </p>

            <span className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white">
              Select File
            </span>

            <input
              id="dataset-upload"
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </section>

        {/* Selected File */}
        {selectedFile && (
          <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
                  <FileSpreadsheet
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {formatFileSize(selectedFile.size)} · CSV
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={removeFile}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  <X size={15} />
                  Remove
                </button>

                <button
                  onClick={uploadFile}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <RefreshCw
                        size={15}
                        className="animate-spin"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={15} />
                      Analyze Dataset
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Error */}
        {error && (
          <section className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Upload Failed
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Analysis Result */}
        {result?.success && result.analysis && (
          <section className="mb-8 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <CheckCircle2
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Dataset Processed Successfully
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    SignalOps analyzed the uploaded dataset and detected
                    its operational structure.
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Processed
              </span>
            </div>

            {/* Analysis KPI */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Rows
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {result.analysis.rows}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Columns
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {result.analysis.columns}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Dataset Type
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  {result.analysis.dataset_type}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  File Type
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  {result.file_type}
                </p>
              </div>
            </div>

            {/* Detected Fields */}
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-900">
                Detected Data Fields
              </p>

              <div className="flex flex-wrap gap-2">
                {result.analysis.detected_fields.length > 0 ? (
                  result.analysis.detected_fields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium capitalize text-blue-700"
                    >
                      {field.replace("_", " ")}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    No recognized operational fields detected.
                  </span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Sample Data */}
        {result?.success &&
          result.sample &&
          result.sample.length > 0 && (
            <section className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Dataset Preview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  First rows returned by the SignalOps ingestion engine.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                      {result.columns?.map((column) => (
                        <th
                          key={column}
                          className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {result.sample.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-slate-100 last:border-0"
                      >
                        {result.columns?.map((column) => (
                          <td
                            key={column}
                            className="px-6 py-3 text-sm text-slate-600"
                          >
                            {row[column] ?? "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        {/* Supported Data */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <FileSpreadsheet
              size={20}
              className="text-blue-600"
            />

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Employee Data
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Detect employee identifiers, departments, performance,
              workload, and risk information.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <FileSpreadsheet
              size={20}
              className="text-emerald-600"
            />

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Customer Data
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Detect customer accounts, activity, health, revenue, and
              risk indicators.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <FileSpreadsheet
              size={20}
              className="text-amber-600"
            />

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Operational Data
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Identify risk, revenue, performance, and other operational
              signals automatically.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}