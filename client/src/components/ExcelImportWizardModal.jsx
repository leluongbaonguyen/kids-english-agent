import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  FileSpreadsheet, Upload, Download, CheckCircle, AlertTriangle, XCircle, RefreshCw, Database,
  ArrowRight, ArrowLeft, Shield, FileText, ChevronRight, Filter, Eye, RotateCcw, Sparkles
} from 'lucide-react';

export function ExcelImportWizardModal({ isOpen, onClose, currentActor, addToast, onImportSuccess }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState('');
  const [job, setJob] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedRowDetail, setSelectedRowDetail] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rollbackReason, setRollbackReason] = useState('');
  const [showRollbackModal, setShowRollbackModal] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFile(null);
      setFileBase64('');
      setJob(null);
      setCheckResult(null);
      setSelectedRowDetail(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Download Official V6 Excel Template
  const handleDownloadTemplate = () => {
    window.open('/api/v1/admin/import-templates/kids-english', '_blank');
    if (addToast) addToast('📥 Đã khởi tạo tải xuống Template Excel V6.0 chuẩn (9 Sheets)!', 'success');
  };

  // Handle Local File Select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.xlsx')) {
      if (addToast) addToast('⚠️ Chỉ chấp nhận định dạng file .xlsx (RULE FILE-001)!', 'warning');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setFileBase64(evt.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Step 2: Upload File & Create Import Job
  const handleUploadAndCreateJob = async () => {
    if (!file || !fileBase64) {
      if (addToast) addToast('⚠️ Vui lòng chọn tệp Excel trước!', 'warning');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/v1/admin/imports/excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64,
          fileName: file.name
        })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Lỗi khi tải file Excel lên server!');
      }

      setJob(data.data);
      setStep(3); // Move to Pre-check stage
      if (addToast) addToast('✅ Đã nạp file Excel & khởi tạo Staging Import Job!', 'success');
      
      // Auto trigger Pre-check (Step 3)
      runPreCheckDryRun(data.data.job_id);
    } catch (err) {
      if (addToast) addToast(`❌ ${err.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 3 & 6: Execute Pre-check / Re-check Dry-Run Engine
  const runPreCheckDryRun = async (targetJobId = job?.job_id) => {
    if (!targetJobId) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/v1/admin/imports/${targetJobId}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Lỗi khi chạy Pre-check Dry-Run!');
      }

      setCheckResult(data.data);
      setStep(4); // Move to Summary Step
      if (addToast) addToast(`✨ Hoàn tất Pre-check Dry-Run (Revision #${data.data.check_revision})!`, 'info');
    } catch (err) {
      if (addToast) addToast(`❌ ${err.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 7: Commit READY_INSERT Rows to Canonical Database
  const handleCommitJob = async () => {
    if (!job?.job_id) return;
    if (!checkResult?.can_commit) {
      if (addToast) addToast('⛔ Không thể Commit: Job còn bản ghi bị xung đột hoặc lỗi schema!', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/v1/admin/imports/${job.job_id}/commit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Lỗi khi Commit dữ liệu vào CSDL!');
      }

      setStep(9); // Move to Post-check / Completion
      if (addToast) addToast(`🎉 Đã Commit thành công ${data.data.insertedCount} bản ghi vào CSDL!`, 'success');
      if (onImportSuccess) onImportSuccess();
    } catch (err) {
      if (addToast) addToast(`❌ ${err.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Rollback Imported Job
  const handleRollbackJob = async () => {
    if (!job?.job_id) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/v1/admin/imports/${job.job_id}/rollback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rollbackReason || 'Admin Yêu Cầu Rollback' })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Lỗi khi Rollback job!');
      }

      setShowRollbackModal(false);
      if (addToast) addToast('🔄 Đã Rollback toàn bộ dữ liệu của Import Job này thành công!', 'warning');
      if (onImportSuccess) onImportSuccess();
      onClose();
    } catch (err) {
      if (addToast) addToast(`❌ ${err.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download Annotated Report Excel
  const handleDownloadReport = () => {
    if (!job?.job_id) return;
    window.open(`/api/v1/admin/imports/${job.job_id}/report.xlsx`, '_blank');
    if (addToast) addToast('📊 Đã tải báo cáo đối soát 06_SYSTEM_RESULT thành công!', 'success');
  };

  // Filtered rows for Step 5 Review Table
  const filteredRows = (checkResult?.rowResults || []).filter((r) => {
    if (selectedStatusFilter === 'ALL') return true;
    if (selectedStatusFilter === 'READY_INSERT') return r.row_status === 'READY_INSERT';
    if (selectedStatusFilter === 'DUPLICATE_EXACT_SKIP') return r.row_status === 'DUPLICATE_EXACT_SKIP';
    if (selectedStatusFilter === 'CONFLICT_REVIEW') return r.row_status === 'CONFLICT_REVIEW';
    if (selectedStatusFilter === 'INVALID') return r.row_status.startsWith('INVALID');
    return true;
  });

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn font-sans cursor-pointer" onClick={onClose}>
      <div className="w-full max-w-5xl max-h-[88vh] overflow-y-auto my-auto rounded-3xl border-2 border-cyan-500/60 bg-gradient-to-br from-slate-950 via-cyan-950/40 to-slate-950 p-5 md:p-8 space-y-6 shadow-2xl text-white cursor-default custom-scrollbar" onClick={(e) => e.stopPropagation()}>
        
        {/* Header & Step Wizard Track */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black font-heading text-white flex items-center gap-2">
                <span>IMPORT DỮ LIỆU EXCEL V6.0</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono-code">
                  KIDS_ENGLISH_IMPORT_V1
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Check-First • Skip Duplicates • Re-Check • Manual Commit • Rollback (6 Level / 90 Topic / 900 Vocab / 2250 Exercise)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-500 transition"
          >
            Đóng ✖
          </button>
        </div>

        {/* 10-Step Visual Stepper Bar */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 text-center text-[10px] font-black">
          {[
            { s: 1, name: '1. File' },
            { s: 2, name: '2. Schema' },
            { s: 3, name: '3. Precheck' },
            { s: 4, name: '4. Summary' },
            { s: 5, name: '5. Review' },
            { s: 6, name: '6. Recheck' },
            { s: 7, name: '7. Confirm' },
            { s: 8, name: '8. Commit' },
            { s: 9, name: '9. Postcheck' },
            { s: 10, name: '10. Result' }
          ].map((item) => (
            <div
              key={item.s}
              onClick={() => {
                if (item.s <= step && checkResult) setStep(item.s);
              }}
              className={`p-1.5 rounded-xl border transition cursor-pointer ${
                step === item.s
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg scale-105'
                  : item.s < step
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900/60 text-slate-500 border-slate-800'
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* STEP 1: FILE SELECTION & TEMPLATE DOWNLOAD */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h4 className="text-sm font-black text-cyan-200">📥 TẢI TEMPLATE EXCEL V6.0 CHUẨN ĐÃ CÓ MẪU DỮ LIỆU</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Bao gồm 9 sheet chuẩn (`00_HUONG_DAN`, `01_IMPORT_CONFIG`, `02_LEVELS`, `03_TOPICS`, `04_VOCABULARY`, `05_EXERCISES`, v.v.)
                </p>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Tải Template V6.0 (.xlsx)
              </button>
            </div>

            <div className="border-2 border-dashed border-cyan-400/60 rounded-3xl p-8 text-center space-y-4 bg-slate-900/60 hover:bg-slate-900 transition">
              <Upload className="h-10 w-10 text-cyan-300 mx-auto animate-bounce" />
              <div>
                <h4 className="text-base font-black text-white">CHỌN HOẶC KÉO THẢ TỆP EXCEL CỦA BẠN VÀO ĐÂY</h4>
                <p className="text-xs text-slate-400 mt-1">Chấp nhận định dạng file `.xlsx` (RULE FILE-001). Không chứa macro.</p>
              </div>

              <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-black text-xs shadow-xl hover:scale-105 transition cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                <span>{file ? `Đã chọn: ${file.name}` : 'Chọn Tệp Excel Từ Máy Tính'}</span>
                <input type="file" accept=".xlsx" onChange={handleFileChange} className="hidden" />
              </label>

              {file && (
                <div className="pt-2 text-xs text-emerald-300 font-mono-code">
                  ✔ Kích thước: {(file.size / 1024).toFixed(1)} KB — Sẵn sàng tải lên!
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                disabled={!file || isProcessing}
                onClick={handleUploadAndCreateJob}
                className={`px-6 py-3 rounded-2xl text-xs font-black shadow-xl transition flex items-center gap-2 ${
                  file && !isProcessing
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-105'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                <span>Tải Lên & Chạy Validation Schema ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 & SUMMARY: METRICS & FULL COURSE CHECK */}
        {step === 4 && checkResult && (
          <div className="space-y-6 animate-fadeIn">
            {/* Package Mode Status Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between flex-wrap gap-3 ${
              checkResult.summary.count_mismatch
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
                : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
            }`}>
              <div className="flex items-center gap-3">
                {checkResult.summary.count_mismatch ? (
                  <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-emerald-400 shrink-0" />
                )}
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider">
                    {checkResult.summary.count_mismatch
                      ? '⚠️ CẢNH BÁO FULL_COURSE: Sai lệch số lượng tiêu chuẩn!'
                      : '✅ ĐẠT TIÊU CHUẨN FULL_COURSE (6 Level • 90 Topic • 900 Vocab • 2250 Exercise)'}
                  </h4>
                  <p className="text-xs opacity-90">
                    Số lượng thực tế: {checkResult.summary.actual_counts.levels} Level, {checkResult.summary.actual_counts.topics} Topic, {checkResult.summary.actual_counts.vocab} Vocab, {checkResult.summary.actual_counts.exercises} Exercise.
                  </p>
                </div>
              </div>

              <div className="text-xs font-black font-mono-code px-3 py-1 rounded-full bg-black/40 border border-white/20">
                {job?.config?.package_mode || 'FULL_COURSE'}
              </div>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1">
                <div className="text-2xl font-black text-cyan-300 font-mono-code">{checkResult.summary.rows_total}</div>
                <div className="text-xs text-slate-400 font-bold uppercase">Tổng Số Dòng Parsed</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 space-y-1">
                <div className="text-2xl font-black text-emerald-400 font-mono-code">{checkResult.summary.ready_insert}</div>
                <div className="text-xs text-emerald-300 font-bold uppercase">Sẵn Sàng Thêm Mới (Ready)</div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-500/60 space-y-1">
                <div className="text-2xl font-black text-blue-400 font-mono-code">{checkResult.summary.duplicate_exact_skip}</div>
                <div className="text-xs text-blue-300 font-bold uppercase">Bỏ Qua Trùng (Skip Exact)</div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/60 space-y-1">
                <div className="text-2xl font-black text-rose-400 font-mono-code">{checkResult.summary.conflict_review}</div>
                <div className="text-xs text-rose-300 font-bold uppercase">Xung Đột Nối Tệp (Conflict Hold)</div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
              >
                ⬅ Chọn Tệp Khác
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => runPreCheckDryRun()}
                  className="px-4 py-2 rounded-xl bg-purple-950 border border-purple-500/50 text-purple-300 text-xs font-bold hover:bg-purple-800 transition flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Check Lại (Re-Check)
                </button>

                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-2"
                >
                  <span>Xem Chi Tiết Bảng Dòng (Review Rows) ➔</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: INTERACTIVE ROW REVIEW & DIFF INSPECTION TABLE */}
        {step === 5 && checkResult && (
          <div className="space-y-4 animate-fadeIn">
            {/* Filter Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5 flex-wrap text-xs font-black">
                {[
                  { id: 'ALL', label: `Tất Cả (${checkResult.rowResults.length})` },
                  { id: 'READY_INSERT', label: `Ready (${checkResult.summary.ready_insert})` },
                  { id: 'DUPLICATE_EXACT_SKIP', label: `Skip (${checkResult.summary.duplicate_exact_skip})` },
                  { id: 'CONFLICT_REVIEW', label: `Conflict (${checkResult.summary.conflict_review})` },
                  { id: 'INVALID', label: `Errors (${checkResult.summary.invalid_rows})` }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl border transition ${
                      selectedStatusFilter === f.id
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleDownloadReport}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-800 transition flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Báo Cáo 06_SYSTEM_RESULT
              </button>
            </div>

            {/* Row Review Table */}
            <div className="max-h-72 overflow-y-auto custom-scrollbar border border-slate-800 rounded-2xl bg-slate-900/90">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold sticky top-0">
                    <th className="p-3">Dòng</th>
                    <th className="p-3">Sheet</th>
                    <th className="p-3">Thực Thể</th>
                    <th className="p-3">Mã Nguồn</th>
                    <th className="p-3">Trạng Thái Check</th>
                    <th className="p-3">Hành Động</th>
                    <th className="p-3">Thông Báo Chi Tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono-code text-[11px]">
                  {filteredRows.slice(0, 100).map((r) => (
                    <tr
                      key={r.row_id}
                      onClick={() => setSelectedRowDetail(r)}
                      className="hover:bg-slate-800/60 cursor-pointer transition"
                    >
                      <td className="p-3 text-slate-400">#{r.excel_row}</td>
                      <td className="p-3 text-cyan-300">{r.sheet_name}</td>
                      <td className="p-3 text-slate-300">{r.entity_type}</td>
                      <td className="p-3 font-bold text-white">{r.source_code}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          r.row_status === 'READY_INSERT'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                            : r.row_status === 'DUPLICATE_EXACT_SKIP'
                            ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                            : r.row_status === 'CONFLICT_REVIEW'
                            ? 'bg-rose-950 text-rose-300 border-rose-500/50'
                            : 'bg-amber-950 text-amber-300 border-amber-500/50'
                        }`}>
                          {r.row_status}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-yellow-300">{r.action}</td>
                      <td className="p-3 text-slate-300 truncate max-w-xs">{r.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
              >
                ⬅ Xem Tổng Quan Summary
              </button>

              <button
                onClick={() => setStep(7)}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                <span>Chuyển Sang Bước Confirm Commit ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: COMMIT CONFIRMATION & GATEKEEPER */}
        {step === 7 && checkResult && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 rounded-3xl bg-slate-900 border-2 border-emerald-500/60 space-y-4">
              <h4 className="text-base font-black text-emerald-300 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>XÁC NHẬN COMMIT DỮ LIỆU CHÍNH THỨC VÀO CƠ SỞ DỮ LIỆU</span>
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Hệ thống chỉ tiến hành ghi **{checkResult.summary.ready_insert} bản ghi READY_INSERT** mới vào CSDL theo đúng thứ tự phụ thuộc (Level ➔ Topic ➔ Vocabulary ➔ Exercise).
                Tất cả **{checkResult.summary.duplicate_exact_skip} bản ghi trùng chính xác** sẽ được tự động bỏ qua (Skip Duplicate).
              </p>

              {!checkResult.can_commit && (
                <div className="p-3 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs font-bold flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                  <span>CẢNH BÁO: Job chưa đạt điều kiện Commit do còn bản ghi xung đột CONFLICT_REVIEW hoặc lỗi INVALID!</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(5)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
              >
                ⬅ Quay Lại Review
              </button>

              <button
                disabled={!checkResult.can_commit || isProcessing}
                onClick={handleCommitJob}
                className={`px-8 py-3 rounded-2xl text-xs font-black shadow-xl transition flex items-center gap-2 ${
                  checkResult.can_commit && !isProcessing
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:scale-105'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>⚡ BẤM XÁC NHẬN COMMIT DỮ LIỆU NGAY</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 9 & 10: RESULT, REPORT EXPORT & ROLLBACK */}
        {(step === 9 || step === 10) && (
          <div className="space-y-6 animate-fadeIn text-center">
            <div className="p-6 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200 space-y-3">
              <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-black font-heading text-white">
                HOÀN TẤT IMPORT DỮ LIỆU THÀNH CÔNG!
              </h4>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Hệ thống đã ghi thành công dữ liệu chuẩn V6.0 vào CSDL. Toàn bộ tiến độ học & lịch sử hệ thống đã được cập nhật đồng bộ!
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={handleDownloadReport}
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs shadow-lg transition flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Tải Báo Cáo Đối Soát 06_SYSTEM_RESULT
              </button>

              <button
                onClick={() => setShowRollbackModal(true)}
                className="px-6 py-3 rounded-2xl bg-rose-950 border border-rose-500/50 hover:bg-rose-800 text-rose-300 font-black text-xs transition flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Rollback Import Job Này
              </button>
            </div>
          </div>
        )}

        {/* Modal Sub-dialog Rollback Confirmation */}
        {showRollbackModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 font-sans">
            <div className="w-full max-w-md rounded-3xl border-2 border-rose-500 bg-slate-950 p-6 space-y-4 text-white shadow-2xl">
              <h4 className="text-lg font-black text-rose-400 flex items-center gap-2">
                <RotateCcw className="h-5 w-5" /> XÁC NHẬN ROLLBACK IMPORT JOB
              </h4>
              <p className="text-xs text-slate-300">
                Thao tác này sẽ gỡ bỏ tất cả bản ghi vừa được nhập bởi Job **{job?.job_id}** khỏi CSDL.
              </p>
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Lý do rollback:</label>
                <input
                  type="text"
                  value={rollbackReason}
                  onChange={(e) => setRollbackReason(e.target.value)}
                  placeholder="ví dụ: Phát hiện dữ liệu mẫu nhầm lẫn..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 font-bold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowRollbackModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Hủy Thao Tác
                </button>
                <button
                  onClick={handleRollbackJob}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-xs shadow-lg hover:bg-rose-500"
                >
                  Bấm Rollback Ngay
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
