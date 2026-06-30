// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var green = style.getPropertyValue('--green').trim();

  // Mobile detection
  var isMobile = window.innerWidth <= 768;
  var isSmall = window.innerWidth <= 480;
  var labelFS = isMobile ? 9 : 11;
  var axisFS = isMobile ? 9 : 10;
  var barW = isMobile ? 14 : 18;

  var commonTooltip = { appendToBody: true };
  var commonLine = { lineStyle: { color: rule } };
  var commonAxisLabel = { color: muted, fontSize: axisFS };
  var commonNameStyle = { color: muted, fontSize: labelFS };

  // Responsive grid helper
  function grid(l, r, t, b) {
    return isMobile
      ? { left: Math.round(l * 0.65), right: Math.round(r * 0.7), top: t, bottom: b }
      : { left: l, right: r, top: t, bottom: b };
  }

  // ===== Chart 1: Radar - Top 5 Perilla Score =====
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radarChart = echarts.init(radarEl, null, { renderer: 'svg' });
    radarChart.setOption({
      animation: false,
      backgroundColor: 'transparent',
      tooltip: { appendToBody: true, trigger: 'item' },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: isMobile ? 9 : 11 },
        data: ['药明生物(93)', '义翘神州(90)', '百普赛斯(87)', '凯莱英(86)', '奥浦迈(85)'],
        itemWidth: 10, itemHeight: 10,
        type: isMobile ? 'scroll' : 'plain'
      },
      radar: {
        center: ['50%', isMobile ? '46%' : '52%'],
        radius: isMobile ? '58%' : '65%',
        indicator: [
          { name: '断供杀伤力\n(30)', max: 30 },
          { name: '寡头格局\n(25)', max: 25 },
          { name: '扩产周期\n(20)', max: 20 },
          { name: '技术壁垒\n(15)', max: 15 },
          { name: '冷门低估\n(10)', max: 10 }
        ],
        axisName: { color: muted, fontSize: 10, padding: [3, 5] },
        splitArea: { areaStyle: { color: [bg2, bg2] } },
        splitLine: commonLine,
        axisLine: commonLine
      },
      series: [{
        type: 'radar',
        data: [
          { value: [28, 24, 20, 14, 7], name: '药明生物(93)', lineStyle: { color: danger, width: 2 }, areaStyle: { color: danger + '22' }, itemStyle: { color: danger }, symbol: 'circle', symbolSize: 4 },
          { value: [27, 23, 18, 13, 9], name: '义翘神州(90)', lineStyle: { color: accent, width: 2 }, areaStyle: { color: accent + '22' }, itemStyle: { color: accent }, symbol: 'circle', symbolSize: 4 },
          { value: [26, 22, 17, 13, 9], name: '百普赛斯(87)', lineStyle: { color: accent2, width: 2 }, areaStyle: { color: accent2 + '22' }, itemStyle: { color: accent2 }, symbol: 'circle', symbolSize: 4 },
          { value: [26, 21, 18, 14, 7], name: '凯莱英(86)', lineStyle: { color: green, width: 2 }, areaStyle: { color: green + '22' }, itemStyle: { color: green }, symbol: 'circle', symbolSize: 4 },
          { value: [25, 22, 17, 12, 9], name: '奥浦迈(85)', lineStyle: { color: '#8b5cf6', width: 2 }, areaStyle: { color: '#8b5cf622' }, itemStyle: { color: '#8b5cf6' }, symbol: 'circle', symbolSize: 4 }
        ]
      }]
    });
    window.addEventListener('resize', function() { radarChart.resize(); });
  }

  // ===== Chart 2: Score Distribution Bar =====
  var scoreEl = document.getElementById('chart-score');
  if (scoreEl) {
    var scoreChart = echarts.init(scoreEl, null, { renderer: 'svg' });
    var stocks = ['百利天恒', '东富龙', '南模生物', '信达生物', '博腾股份', '康方生物', '百济神州', '泰格医药', '康龙化成', '药明康德', '奥浦迈', '凯莱英', '百普赛斯', '义翘神州', '药明生物'];
    var scores = [60, 67, 72, 73, 76, 77, 78, 79, 80, 81, 85, 86, 87, 90, 93];
    var colors = scores.map(function(s) {
      if (s >= 85) return accent;
      if (s >= 75) return accent2;
      return muted;
    });

    scoreChart.setOption({
      animation: false,
      backgroundColor: 'transparent',
      tooltip: {
        appendToBody: true, trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function(p) { return p[0].name + '<br/>紫苏叶评分：<b>' + p[0].value + '/100</b>'; }
      },
      grid: grid(100, 40, 20, 10),
      xAxis: {
        type: 'value', min: 50, max: 100,
        axisLabel: { color: muted, fontSize: axisFS, formatter: '{value}分' },
        splitLine: commonLine, axisLine: commonLine
      },
      yAxis: {
        type: 'category', data: stocks,
        axisLabel: { color: ink, fontSize: isMobile ? 9 : 11 },
        axisTick: { show: false }, axisLine: commonLine
      },
      series: [{
        type: 'bar',
        data: scores.map(function(v, i) {
          return { value: v, itemStyle: { color: colors[i], borderRadius: [0, 4, 4, 0] } };
        }),
        barWidth: isMobile ? 12 : 18,
        label: { show: true, position: 'right', color: muted, fontSize: axisFS, fontWeight: 700, formatter: '{c}' },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: rule, type: 'dashed' },
          data: [{ xAxis: 80, label: { formatter: '高分线 80', color: muted, fontSize: 10 } }]
        }
      }]
    });
    window.addEventListener('resize', function() { scoreChart.resize(); });
  }

  // ===== Chart 3: BD License-out Trend =====
  var bdEl = document.getElementById('chart-bd-trend');
  if (bdEl) {
    var bdChart = echarts.init(bdEl, null, { renderer: 'svg' });
    bdChart.setOption({
      animation: false,
      backgroundColor: 'transparent',
      tooltip: {
        appendToBody: true, trigger: 'axis',
        formatter: function(params) {
          var result = params[0].name + '<br/>';
          params.forEach(function(p) {
            if (p.seriesName === '交易额(亿美元)') result += p.marker + ' ' + p.seriesName + ': <b>$' + p.value + '亿</b><br/>';
            else result += p.marker + ' ' + p.seriesName + ': <b>' + p.value + '笔</b><br/>';
          });
          return result;
        }
      },
      legend: { top: 0, textStyle: { color: muted, fontSize: isMobile ? 9 : 11 }, data: ['交易额(亿美元)', '交易笔数'] },
      grid: grid(60, 60, 40, 40),
      xAxis: {
        type: 'category',
        data: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026Q1'],
        axisLine: commonLine, axisTick: { show: false }, axisLabel: commonAxisLabel
      },
      yAxis: [
        {
          type: 'value', name: '亿美元',
          nameTextStyle: commonNameStyle, axisLabel: commonAxisLabel, splitLine: commonLine
        },
        {
          type: 'value', name: '笔',
          nameTextStyle: commonNameStyle, axisLabel: commonAxisLabel, splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '交易额(亿美元)', type: 'bar',
          data: [15, 28, 45, 52, 78, 120, 280, 600],
          itemStyle: { color: accent2 + '99' }, barWidth: isMobile ? 16 : 24,
          label: { show: !isMobile, position: 'top', color: accent2, fontSize: 10, fontWeight: 700, formatter: '{c}亿' }
        },
        {
          name: '交易笔数', type: 'line', yAxisIndex: 1,
          data: [8, 15, 22, 25, 35, 48, 65, 72],
          lineStyle: { color: accent, width: 2.5 }, itemStyle: { color: accent },
          symbol: 'circle', symbolSize: isMobile ? 6 : 8,
          label: { show: !isMobile, color: accent, fontSize: 10, fontWeight: 700, formatter: '{c}笔', position: 'top', distance: 10 }
        }
      ]
    });
    window.addEventListener('resize', function() { bdChart.resize(); });
  }

  // ===== Chart 4: PE Deviation Bar =====
  var peDevEl = document.getElementById('chart-pe-deviation');
  if (peDevEl) {
    var peDevChart = echarts.init(peDevEl, null, { renderer: 'svg' });
    var peStocks = ['药明康德', '东富龙', '博腾股份', '泰格医药', '凯莱英', '康龙化成', '义翘神州', '南模生物', '百普赛斯', '药明生物', '奥浦迈'];
    var currentPE = [18, 20, 22, 25, 28, 32, 35, 38, 42, 45, 48];
    var histPE = [35, 30, 38, 40, 45, 50, 55, 50, 65, 80, 70];

    peDevChart.setOption({
      animation: false,
      backgroundColor: 'transparent',
      tooltip: {
        appendToBody: true, trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var name = params[0].name;
          var idx = peStocks.indexOf(name);
          var cur = currentPE[idx];
          var hist = histPE[idx];
          var dev = (cur / hist).toFixed(2);
          return '<b>' + name + '</b><br/>当前PE: ' + cur + 'x<br/>历史中枢: ' + hist + 'x<br/>偏离度: ' + dev + 'x';
        }
      },
      legend: { top: 0, textStyle: { color: muted, fontSize: isMobile ? 9 : 11 }, data: ['当前PE(TTM)', '历史PE中枢'] },
      grid: grid(100, 40, 40, 10),
      xAxis: {
        type: 'value', name: 'PE(x)',
        nameTextStyle: commonNameStyle, axisLabel: commonAxisLabel,
        splitLine: commonLine, axisLine: commonLine
      },
      yAxis: {
        type: 'category', data: peStocks,
        axisLabel: { color: ink, fontSize: isMobile ? 9 : 11 },
        axisTick: { show: false }, axisLine: commonLine
      },
      series: [
        {
          name: '当前PE(TTM)', type: 'bar',
          data: currentPE.map(function(v) {
            var c = v > 40 ? danger : green;
            return { value: v, itemStyle: { color: c, borderRadius: [0, 3, 3, 0] } };
          }),
          barWidth: isMobile ? 10 : 16,
          label: { show: true, position: 'right', color: muted, fontSize: axisFS, formatter: '{c}x' }
        },
        {
          name: '历史PE中枢', type: 'bar',
          data: histPE.map(function(v) {
            return { value: v, itemStyle: { color: muted + '66', borderRadius: [0, 3, 3, 0] } };
          }),
          barWidth: isMobile ? 10 : 16,
          label: { show: !isMobile, position: 'right', color: muted, fontSize: 9, formatter: '{c}x' }
        }
      ]
    });
    window.addEventListener('resize', function() { peDevChart.resize(); });
  }

  // ===== Chart 5: Decision Matrix Bubble (Perilla Score × Stage × PE Deviation) =====
  var dmEl = document.getElementById('chart-decision-matrix');
  if (dmEl) {
    var dmChart = echarts.init(dmEl, null, { renderer: 'svg' });
    var dmData = [
      { name: '义翘神州', score: 90, stage: 1.8, dev: 0.64, mcap: 150, color: green },
      { name: '百普赛斯', score: 87, stage: 1.8, dev: 0.65, mcap: 120, color: green },
      { name: '奥浦迈', score: 85, stage: 2.2, dev: 0.69, mcap: 80, color: green },
      { name: '南模生物', score: 72, stage: 1.5, dev: 0.76, mcap: 40, color: accent2 },
      { name: '东富龙', score: 67, stage: 1.5, dev: 0.67, mcap: 100, color: accent2 },
      { name: '凯莱英', score: 86, stage: 2.5, dev: 0.62, mcap: 350, color: accent2 },
      { name: '康龙化成', score: 80, stage: 2.5, dev: 0.64, mcap: 450, color: accent2 },
      { name: '药明生物', score: 93, stage: 3.0, dev: 0.56, mcap: 1800, color: accent },
      { name: '泰格医药', score: 79, stage: 2.2, dev: 0.63, mcap: 400, color: accent2 },
      { name: '药明康德', score: 81, stage: 3.0, dev: 0.51, mcap: 2200, color: accent },
      { name: '博腾股份', score: 76, stage: 2.2, dev: 0.58, mcap: 120, color: accent2 },
      { name: '百济神州', score: 78, stage: 3.5, dev: 0.67, mcap: 2500, color: danger },
      { name: '康方生物', score: 77, stage: 3.0, dev: 0.67, mcap: 600, color: accent },
      { name: '信达生物', score: 73, stage: 3.0, dev: 0.64, mcap: 800, color: accent },
      { name: '百利天恒', score: 60, stage: 3.5, dev: 0.75, mcap: 500, color: danger }
    ];

    dmChart.setOption({
      animation: false,
      backgroundColor: 'transparent',
      tooltip: {
        appendToBody: true, trigger: 'item',
        formatter: function(p) {
          var d = dmData.find(function(item) { return item.name === p.data[3]; });
          return '<b>' + d.name + '</b><br/>紫苏叶评分: ' + d.score + '/100<br/>认知阶段: ' + (d.stage < 2 ? 'I 萌芽期' : d.stage < 2.5 ? 'I→II' : d.stage < 3 ? 'II 扩散期' : d.stage < 3.5 ? 'III 加速期' : 'III→IV 泡沫') + '<br/>PE偏离度: ' + d.dev + 'x<br/>市值: ' + d.mcap + '亿';
        }
      },
      grid: grid(60, 60, 40, 50),
      xAxis: {
        type: 'value', name: '认知阶段',
        min: 1, max: 4, interval: 0.5,
        nameTextStyle: commonNameStyle,
        axisLabel: {
          color: muted, fontSize: axisFS,
          formatter: function(v) {
            if (v === 1) return 'I 萌芽';
            if (v === 1.5) return 'I→II';
            if (v === 2) return 'II 扩散';
            if (v === 2.5) return 'II→III';
            if (v === 3) return 'III 加速';
            if (v === 3.5) return 'III→IV';
            if (v === 4) return 'IV 泡沫';
            return '';
          }
        },
        splitLine: commonLine, axisLine: commonLine
      },
      yAxis: {
        type: 'value', name: '紫苏叶评分',
        min: 55, max: 100,
        nameTextStyle: commonNameStyle,
        axisLabel: { color: muted, fontSize: axisFS, formatter: '{value}' },
        splitLine: commonLine, axisLine: commonLine
      },
      series: [{
        type: 'scatter',
        data: dmData.map(function(d) {
          return [d.stage, d.score, Math.sqrt(d.mcap) / 3, d.name, d.color];
        }),
        symbolSize: function(val) { return Math.max(val[2], isMobile ? 10 : 12); },
        itemStyle: {
          borderColor: bg2, borderWidth: 1.5,
          color: function(p) { return p.data[4]; },
          opacity: 0.85
        },
        label: {
          show: true, formatter: function(p) { return p.data[3]; },
          position: 'top', color: ink, fontSize: isMobile ? 8 : 10, distance: 6
        },
        emphasis: { scale: 1.6, label: { fontSize: 13, fontWeight: 700 } }
      }],
      graphic: [
        { type: 'text', left: isMobile ? 50 : 100, top: 55, style: { text: '★ 最佳区：高评分+早阶段', fill: green, fontSize: isMobile ? 8 : 10, fontWeight: 700 } },
        { type: 'text', left: isMobile ? 180 : 400, top: 230, style: { text: '⚠ 警惕区：低评分+后阶段', fill: danger, fontSize: isMobile ? 8 : 10, fontWeight: 700 } }
      ]
    });
    window.addEventListener('resize', function() { dmChart.resize(); });
  }
})();