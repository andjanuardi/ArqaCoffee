// ============================================================
        // AFTER RENDER HOOKS (Charts & Maps)
        // ============================================================
        function afterRender() {
            initCharts();
            initMaps();
            initPromoCarousel();
        }

        function initCharts() {
            // Hancurkan chart lama jika ada untuk mencegah memory leak dan error
            Object.keys(State.chartInstances).forEach(key => {
                try { State.chartInstances[key].destroy(); } catch (e) { }
            });
            State.chartInstances = {};

            const chartOptions = (yLabel) => ({
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        title: { display: true, text: yLabel, color: '#7a9ba5' },
                        ticks: { color: '#7a9ba5' },
                        grid: { color: 'rgba(31, 61, 74, 0.5)' }
                    },
                    x: {
                        ticks: { color: '#7a9ba5' },
                        grid: { display: false }
                    }
                }
            });

            const chartConfigs = {
                'chart-cashier': {
                    type: 'bar',
                    data: {
                        labels: DB.dailySales.map(d => formatDate(d.date).replace(' 2025', '')),
                        datasets: [{
                            label: 'Pendapatan',
                            data: DB.dailySales.map(d => d.revenue / 1000),
                            backgroundColor: 'rgba(224, 122, 58, 0.6)',
                            borderColor: '#e07a3a',
                            borderWidth: 1,
                            borderRadius: 6
                        }]
                    },
                    options: chartOptions('Ribu Rp')
                },
                'chart-revenue': {
                    type: 'line',
                    data: {
                        labels: DB.dailySales.map(d => formatDate(d.date).replace(' 2025', '')),
                        datasets: [{
                            label: 'Pendapatan',
                            data: DB.dailySales.map(d => d.revenue / 1000),
                            borderColor: '#e07a3a',
                            backgroundColor: 'rgba(224, 122, 58, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#e07a3a'
                        }]
                    },
                    options: chartOptions('Ribu Rp')
                },
                'chart-admin-revenue': {
                    type: 'line',
                    data: {
                        labels: DB.dailySales.map(d => formatDate(d.date).replace(' 2025', '')),
                        datasets: [{
                            label: 'Pendapatan',
                            data: DB.dailySales.map(d => d.revenue / 1000),
                            borderColor: '#e07a3a',
                            backgroundColor: 'rgba(224, 122, 58, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#e07a3a'
                        }]
                    },
                    options: chartOptions('Ribu Rp')
                },
                'chart-finance-detail': {
                    type: 'bar',
                    data: {
                        labels: DB.dailySales.map(d => formatDate(d.date).replace(' 2025', '')),
                        datasets: [
                            {
                                label: 'Pendapatan (Ribu Rp)',
                                data: DB.dailySales.map(d => d.revenue / 1000),
                                backgroundColor: 'rgba(224, 122, 58, 0.6)',
                                borderColor: '#e07a3a',
                                borderWidth: 1,
                                borderRadius: 6
                            },
                            {
                                label: 'Jumlah Pesanan',
                                data: DB.dailySales.map(d => d.orders),
                                backgroundColor: 'rgba(26, 188, 156, 0.6)',
                                borderColor: '#1abc9c',
                                borderWidth: 1,
                                borderRadius: 6
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { labels: { color: '#f0ebe3' } } },
                        scales: {
                            y: { ticks: { color: '#7a9ba5' }, grid: { color: 'rgba(31, 61, 74, 0.5)' } },
                            x: { ticks: { color: '#7a9ba5' }, grid: { display: false } }
                        }
                    }
                },
                'chart-orders': {
                    type: 'doughnut',
                    data: {
                        labels: ['Dine-In Aktif', 'Delivery Aktif', 'Selesai'],
                        datasets: [{
                            data: [
                                DB.orders.filter(o => o.order_type === 'dine-in' && o.status !== 'completed').length,
                                DB.orders.filter(o => o.order_type === 'delivery' && o.status !== 'completed').length,
                                DB.orders.filter(o => o.status === 'completed').length
                            ],
                            backgroundColor: ['#e07a3a', '#1abc9c', '#7a9ba5'],
                            borderWidth: 0
                        }]
                    },
                    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#f0ebe3', padding: 20 } } } }
                }
            };

            // Inisialisasi semua chart yang ada di DOM saat ini
            Object.keys(chartConfigs).forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    State.chartInstances[id] = new Chart(el, chartConfigs[id]);
                }
            });
        }

        function initMaps() {
            // Inisialisasi peta untuk kurir aktif di halaman kurir
            DB.orders.filter(o => o.status === 'delivering' && o.courier_id === State.currentUser.id).forEach(o => {
                const el = document.getElementById(`map-courier-${o.id}`);
                if (el && !State.mapInstances[o.id]) {
                    initCourierMap(o.id);
                }
            });
        }

