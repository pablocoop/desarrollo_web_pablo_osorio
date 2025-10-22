// Gráfico de líneas: avisos por día 
fetch("/api/avisos_por_dia")
  .then((r) => r.json())
  .then((data) => {
    const categorias = data.map((d) => d.dia);
    const valores = data.map((d) => d.cantidad);

    Highcharts.chart("chart-line", {
      chart: { type: "line" },
      title: { text: "Cantidad de avisos agregados por día" },
      xAxis: { categories: categorias, title: { text: "Día" } },
      yAxis: { title: { text: "Número de avisos" }, allowDecimals: false },
      tooltip: { shared: true },
      series: [{ name: "Avisos", data: valores, color: "#007bff" }],
      credits: { enabled: false },
    });
  });

// Gráfico de torta: perros vs gatos 
fetch("/api/avisos_por_tipo")
  .then((r) => r.json())
  .then((data) => {
    const seriesData = data.map((d) => ({
      name: d.tipo.charAt(0).toUpperCase() + d.tipo.slice(1),
      y: d.cantidad,
    }));

    Highcharts.chart("chart-pie", {
      chart: { type: "pie" },
      title: { text: "Distribución total de avisos por tipo de mascota" },
      tooltip: { pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)" },
      accessibility: { point: { valueSuffix: "%" } },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: { enabled: true, format: "<b>{point.name}</b>: {point.percentage:.1f} %" },
        },
      },
      series: [{ name: "Avisos", colorByPoint: true, data: seriesData }],
      credits: { enabled: false },
    });
  });

// Gráfico de barras: gatos y perros por mes
fetch("/api/avisos_por_mes_tipo")
  .then((r) => r.json())
  .then((data) => {
    const meses = Object.keys(data);
    const gatos = meses.map((m) => data[m].gato || 0);
    const perros = meses.map((m) => data[m].perro || 0);

    Highcharts.chart("chart-bar", {
      chart: { type: "column" },
      title: { text: "Cantidad mensual de avisos por tipo" },
      xAxis: { categories: meses, crosshair: true, title: { text: "Mes" } },
      yAxis: { min: 0, title: { text: "Cantidad de avisos" }, allowDecimals: false },
      tooltip: {
        shared: true,
        headerFormat: "<b>{point.key}</b><br>",
        pointFormat: "{series.name}: {point.y}<br/>",
      },
      plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
      series: [
        { name: "Gatos", data: gatos, color: "#ff6384" },
        { name: "Perros", data: perros, color: "#36a2eb" },
      ],
      credits: { enabled: false },
    });
  });
