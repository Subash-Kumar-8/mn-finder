import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Wrench, Eye, AlertTriangle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export function EquipmentTable({ equipmentList = [], onSelectEquipment }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter & Search
  const filteredData = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        item.healthStatus.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [equipmentList, search, statusFilter]);

  // Sort
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Search & Filter Toolbar */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search equipment ID, type, location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b2545]/20 focus:border-[#0b2545]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'HEALTHY', 'NEEDS ATTENTION', 'CRITICAL'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
              <th className="p-3.5 cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">
                  <span>Equipment ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3.5 cursor-pointer" onClick={() => handleSort('type')}>
                <div className="flex items-center gap-1">
                  <span>Type</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3.5 cursor-pointer" onClick={() => handleSort('location')}>
                <div className="flex items-center gap-1">
                  <span>Location</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3.5 cursor-pointer" onClick={() => handleSort('operatingHours')}>
                <div className="flex items-center gap-1">
                  <span>Operating Hours</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3.5 cursor-pointer" onClick={() => handleSort('availability')}>
                <div className="flex items-center gap-1">
                  <span>Availability</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3.5">Health Status</th>
              <th className="p-3.5">Predicted Downtime</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-slate-500 text-xs">
                  No equipment matching your criteria.
                </td>
              </tr>
            ) : (
              paginatedData.map((eq) => {
                const isCritical = eq.healthStatus === 'Critical';
                const isWarning = eq.healthStatus === 'Needs Attention';

                return (
                  <tr
                    key={eq.id}
                    onClick={() => onSelectEquipment(eq.id)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="p-3.5 font-bold text-slate-900 group-hover:text-blue-900">
                      {eq.id}
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">{eq.type}</td>
                    <td className="p-3.5 text-slate-600">{eq.location}</td>
                    <td className="p-3.5 text-slate-800 font-mono">{eq.operatingHours.toLocaleString()} hrs</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              parseInt(eq.availability) > 85
                                ? 'bg-emerald-600'
                                : parseInt(eq.availability) > 75
                                ? 'bg-amber-500'
                                : 'bg-red-600'
                            }`}
                            style={{ width: eq.availability }}
                          />
                        </div>
                        <span className="font-semibold text-slate-800">{eq.availability}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <Badge status={isCritical ? 'critical' : isWarning ? 'warning' : 'healthy'}>
                        {eq.healthStatus}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-semibold">
                      {eq.predictedDowntimeHrs > 0 ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {eq.predictedDowntimeHrs} hrs
                        </span>
                      ) : (
                        <span className="text-slate-400">Low Risk</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEquipment(eq.id);
                        }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing {Math.min((currentPage - 1) * pageSize + 1, sortedData.length)} to{' '}
          {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} units
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-slate-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
