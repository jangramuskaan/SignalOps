"use client";

import { ChangeEvent, useEffect, useState } from "react";
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

type UploadRecord = {
  id: number;
  filename: string;
  file_type: string;
  rows_processed: number;
  columns: string[];
  dataset_type: string;
  detected_fields: string[];
  status: string;
  uploaded_at: string;
};

type UploadSummary = {
  total_uploads: number;
  processed_uploads: number;
  failed_uploads: number;
  total_rows_processed: number;
};

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [summary, setSummary] = useState<UploadSummary | null>(null);

  const [uploading, setUploading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  async function loadUploadHistory() {
    try {
      const [uploadsResponse, summaryResponse] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/uploads", {
          cache: "no-store",
        }),
        fetch("http://127.0.0.1:8000/api/uploads/summary", {
          cache: "no-store",
        }),
      ]);

      if (!uploadsResponse.ok || !summaryResponse.ok) {
        throw new Error("Failed to load upload history");
      }

      const uploadsData = await uploadsResponse.json();
      const summaryData = await summaryResponse.json();

      setUploads(uploadsData.uploads ?? []);
      setSummary(summaryData);
    } catch (err) {
      console.error("Upload history error:", err);
    } finally {
      setLoadingHistory(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadUploadHistory();
  }, []);

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
      setSelectedFile(null);

      await loadUploadHistory();
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

  function handleRefresh() {
    setRefreshing(true);
    loadUploadHistory();
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

  function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Data Operations Center
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ● Data Engine Online
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Upload, analyze, and monitor operational datasets used by
              SignalOps intelligence.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh History
          </button>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total Uploads
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {summary.total_uploads}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Datasets received
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Processed
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-600">
                {summary.processed_uploads}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Successfully analyzed
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Failed
              </p>

              <p className="mt-3 text-3xl font-bold text-red-600">
                {summary.failed_uploads}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Processing failures
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Rows Processed
              </p>

              <p className="mt-3 text-3xl font-bold text-blue-600">
                {summary.total_rows_processed}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Operational records
              </p>
            </div>
          </div>
        )}

        {/* Upload */}
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

        {/* Processing Result */}
        {result?.success && result.analysis && (
          <section className="mb-8 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
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
                  {result.filename} was analyzed by the SignalOps
                  ingestion engine.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  Status
                </p>

                <p className="mt-2 text-sm font-bold text-emerald-600">
                  Processed
                </p>
              </div>
            </div>

            <div className="mt-6">
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

        {/* Upload History */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Upload History
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Previously processed datasets in the current intelligence
                  session.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {uploads.length} Records
              </span>
            </div>
          </div>

          {loadingHistory ? (
            <div className="flex items-center justify-center p-10">
              <RefreshCw
                size={20}
                className="animate-spin text-slate-400"
              />
            </div>
          ) : uploads.length === 0 ? (
            <div className="p-10 text-center">
              <FileSpreadsheet
                size={28}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No datasets uploaded yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Upload a CSV file to create your first data operation.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Dataset
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Rows
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Fields
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Uploaded
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {uploads.map((upload) => (
                    <tr
                      key={upload.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {upload.filename}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {upload.file_type}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          {upload.dataset_type}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {upload.rows_processed}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex max-w-[260px] flex-wrap gap-1.5">
                          {upload.detected_fields.length > 0 ? (
                            upload.detected_fields.map((field) => (
                              <span
                                key={field}
                                className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-600"
                              >
                                {field}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400">
                              None
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            upload.status === "Processed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {upload.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-500">
                        {formatDate(upload.uploaded_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

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