// ============================================================
// AFTER RENDER HOOKS (Charts & Maps)
// ============================================================
function afterRender() {
  initCharts();
  initMaps();
  initPromoCarousel();
}

function initCharts() {
  Object.keys(State.chartInstances).forEach(key => {
    try { State.chartInstances[key].destroy(); } catch (e) { }
  });
  State.chartInstances = {};

  const period = State.financeFilter || 'daily';
  const ds = typeof getFinanceData === 'function' ? getFinanceData(period) : [];

  const formatPeriodLabel = d => {
    if (period === 'yearly') return d.date;
    if (period === 'monthly') {
      const [y, m] = d.date.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      return `${months[parseInt(m) - 1]} ${y}`;
    }
    return formatDate(d.date).replace(/ \d{4}$/, '');
  };

  const chartOptions = (yLabel) => ({
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        title: { display: true, text: yLabel, color: '#7a9ba5' },
        ticks: { color: '#7a9ba5' },
        grid: { color: 'rgba(31, 61, 74, 0.5)' },
      },
      x: {
        ticks: { color: '#7a9ba5' },
        grid: { display: false },
      },
    },
  });

  const chartConfigs = {
    'chart-cashier': {
      type: 'bar',
      data: {
        labels: ds.map(formatPeriodLabel),
        datasets: [{
          label: 'Pendapatan',
          data: ds.map(d => d.revenue / 1000),
          backgroundColor: 'rgba(224, 122, 58, 0.6)',
          borderColor: '#e07a3a',
          borderWidth: 1,
          borderRadius: 6,
        }],
      },
      options: chartOptions('Ribu Rp'),
    },
    'chart-revenue': {
      type: 'line',
      data: {
        labels: ds.map(formatPeriodLabel),
        datasets: [{
          label: 'Pendapatan',
          data: ds.map(d => d.revenue / 1000),
          borderColor: '#e07a3a',
          backgroundColor: 'rgba(224, 122, 58, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#e07a3a',
        }],
      },
      options: chartOptions('Ribu Rp'),
    },
    'chart-admin-revenue': {
      type: 'line',
      data: {
        labels: ds.map(formatPeriodLabel),
        datasets: [{
          label: 'Pendapatan',
          data: ds.map(d => d.revenue / 1000),
          borderColor: '#e07a3a',
          backgroundColor: 'rgba(224, 122, 58, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#e07a3a',
        }],
      },
      options: chartOptions('Ribu Rp'),
    },
    'chart-finance-detail': {
      type: 'bar',
      data: {
        labels: ds.map(formatPeriodLabel),
        datasets: [
          {
            label: 'Pendapatan (Ribu Rp)',
            data: ds.map(d => d.revenue / 1000),
            backgroundColor: 'rgba(224, 122, 58, 0.6)',
            borderColor: '#e07a3a',
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            label: 'Jumlah Pesanan',
            data: ds.map(d => d.orders),
            backgroundColor: 'rgba(26, 188, 156, 0.6)',
            borderColor: '#1abc9c',
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#f0ebe3' } } },
        scales: {
          y: { ticks: { color: '#7a9ba5' }, grid: { color: 'rgba(31, 61, 74, 0.5)' } },
          x: { ticks: { color: '#7a9ba5' }, grid: { display: false } },
        },
      },
    },
    'chart-orders': {
      type: 'doughnut',
      data: {
        labels: ['Dine-In Aktif', 'Delivery Aktif', 'Selesai'],
        datasets: [{
          data: [
            DB.orders.filter(o => o.order_type === 'dine-in' && o.status !== 'completed').length,
            DB.orders.filter(o => o.order_type === 'delivery' && o.status !== 'completed').length,
            DB.orders.filter(o => o.status === 'completed').length,
          ],
          backgroundColor: ['#e07a3a', '#1abc9c', '#7a9ba5'],
          borderWidth: 0,
        }],
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#f0ebe3', padding: 20 } } } },
    },
    'chart-expense-category': (() => {
      let periodExpenses = DB.expenses || [];
      if (period === 'daily') {
        const today = new Date().toISOString().split('T')[0];
        periodExpenses = periodExpenses.filter(e => (e.date || '').startsWith(today));
      } else if (period === 'monthly') {
        const prefix = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
        periodExpenses = periodExpenses.filter(e => (e.date || '').startsWith(prefix));
      } else if (period === 'yearly') {
        periodExpenses = periodExpenses.filter(e => (e.date || '').startsWith(String(new Date().getFullYear())));
      }
      const cats = {};
      periodExpenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + e.amount; });
      const labels = Object.keys(cats);
      const data = Object.values(cats);
      const colors = ['#e07a3a', '#1abc9c', '#e74c3c', '#f39c12', '#9b59b6'];
      return {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Biaya (Rp)',
            data,
            backgroundColor: labels.map((_, i) => colors[i % colors.length]),
            borderRadius: 6,
          }],
        },
        options: {
          responsive: true,
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#7a9ba5', callback: v => 'Rp ' + v.toLocaleString('id-ID') }, grid: { color: 'rgba(31, 61, 74, 0.5)' } },
            y: { ticks: { color: '#f0ebe3' }, grid: { display: false } },
          },
        },
      };
    })(),
    'chart-cashflow': (() => {
      const revData = ds.map(d => d.revenue);
      const expData = ds.map(d => {
        return (DB.expenses || []).filter(e => (e.date || '').startsWith(d.date)).reduce((s, e) => s + e.amount, 0);
      });
      return {
        type: 'bar',
        data: {
          labels: ds.map(formatPeriodLabel),
          datasets: [
            { label: 'Pemasukan', data: revData, backgroundColor: 'rgba(39,174,96,.7)', borderRadius: 6 },
            { label: 'Pengeluaran', data: expData, backgroundColor: 'rgba(231,76,60,.7)', borderRadius: 6 },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: '#f0ebe3' } } },
          scales: {
            y: { ticks: { color: '#7a9ba5' }, grid: { color: 'rgba(31, 61, 74, 0.5)' } },
            x: { ticks: { color: '#7a9ba5' }, grid: { display: false } },
          },
        },
      };
    })(),
  };

  Object.keys(chartConfigs).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      State.chartInstances[id] = new Chart(el, chartConfigs[id]);
    }
  });
}

function initMaps() {
  DB.orders.filter(o => o.status === 'delivering' && o.courier_id === State.currentUser.id).forEach(o => {
    const el = document.getElementById(`map-courier-${o.id}`);
    if (el && !State.mapInstances[o.id]) {
      initCourierMap(o.id);
    }
  });
}
