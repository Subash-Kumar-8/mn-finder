import React, { useState, useEffect } from 'react';
import { getReports, generateNewReport } from '../services/reportsService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FileText, Download, Sparkles, Eye, Plus, Calendar } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getReports();
      setReports(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleGenerateReport = async (title) => {
    setGenerating(true);
    addToast({ title: 'Report Generation Started', message: 'Synthesizing ML inferences & geological core data...', type: 'info' });

    const newRep = await generateNewReport(title);
    setGenerating(false);

    setReports((prev) => [
      {
        id: newRep.reportId,
        title: newRep.title,
        category: 'AI Generated',
        description: `Newly compiled executive intelligence summary generated on ${new Date().toLocaleDateString()}.`,
        date: new Date().toISOString().split('T')[0],
        format: 'PDF',
        size: '5.2 MB',
        status: 'Ready',
        author: 'Ministry Intelligence Engine'
      },
      ...prev
    ]);

    addToast({ title: 'Report Created', message: `${newRep.title} is ready for export.`, type: 'success' });
  };

  const handleExport = (repTitle) => {
    addToast({ title: 'Downloading Report', message: `Exporting ${repTitle} as PDF document.`, type: 'success' });
  };

  if (loading) {
    return <div className="p-8 text-slate-400 animate-pulse">Loading Mining Reports Catalog...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Title & Generate Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports & Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">
            Official government reports, exploration assessments, and predictive audits.
          </p>
        </div>
        <Button
          variant="primary"
          icon={Sparkles}
          loading={generating}
          onClick={() => handleGenerateReport('Executive Mining Intelligence')}
        >
          Generate New Report
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold uppercase">
                  {rep.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{rep.size}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm">{rep.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{rep.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {rep.date}
                </span>
                <span>{rep.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                  className="flex-1"
                  onClick={() => addToast({ title: 'Report Preview', message: `Opening ${rep.title}`, type: 'info' })}
                >
                  View
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Download}
                  className="flex-1"
                  onClick={() => handleExport(rep.title)}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
