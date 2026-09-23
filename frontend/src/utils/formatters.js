/**
 * Format numbers with comma separation
 * @param {number} num 
 * @returns {string}
 */
export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Format tonnage values (e.g. 10000 -> "10,000 T")
 * @param {number} tons 
 * @returns {string}
 */
export function formatTons(tons) {
  return `${formatNumber(tons)} T`;
}

/**
 * Format percentages (e.g. 0.84 -> "84%")
 * @param {number} val 
 * @returns {string}
 */
export function formatPercent(val) {
  if (val > 1) return `${val}%`;
  return `${Math.round(val * 100)}%`;
}

/**
 * Format status color maps for consistency
 * @param {string} status 
 * @returns {{ bg: string, text: string, border: string, dot: string }}
 */
export function getStatusStyle(status) {
  const s = (status || '').toLowerCase();
  if (s === 'healthy' || s === 'low' || s === 'operational' || s === 'completed' || s === 'passed') {
    return {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500'
    };
  }
  if (s === 'warning' || s === 'attention' || s === 'medium' || s === 'pending') {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500'
    };
  }
  if (s === 'critical' || s === 'high' || s === 'failed' || s === 'urgent') {
    return {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      dot: 'bg-red-500'
    };
  }
  // Default info / blue
  return {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500'
  };
}
