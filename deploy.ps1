# Netlify 一键部署脚本
# 将创新药行业Serenity分析报告部署到公网
# © 2026 景琦居 版权所有

$ErrorActionPreference = "Stop"
$reportDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  创新药行业Serenity分析报告 - 公网部署" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "报告目录: $reportDir" -ForegroundColor Yellow
Write-Host ""

# 检查node是否可用
try {
    $nodeVer = node --version 2>&1
    Write-Host "[OK] Node.js 版本: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] 未检测到 Node.js，请先安装: https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "即将使用 Netlify CLI 部署报告到公网..." -ForegroundColor Cyan
Write-Host ""
Write-Host "部署流程:" -ForegroundColor Yellow
Write-Host "  1. 首次使用会提示登录 Netlify（浏览器会自动打开）" -ForegroundColor White
Write-Host "  2. 登录后选择 'Deploy as a new site'" -ForegroundColor White
Write-Host "  3. 按回车确认部署目录和设置" -ForegroundColor White
Write-Host "  4. 部署完成后会显示公网URL" -ForegroundColor White
Write-Host ""
Write-Host "提示: 如果没有Netlify账号，登录页面可免费注册（支持GitHub/Google一键登录）" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "是否开始部署? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "已取消部署。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "正在启动 Netlify 部署..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

# 使用Netlify CLI部署
Set-Location $reportDir
npx netlify deploy --dir=. --prod

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "部署完成！" -ForegroundColor Green
Write-Host ""
Write-Host "如果上方显示了 Website URL，那就是你的公网链接，可以直接在微信中分享。" -ForegroundColor Cyan
Write-Host ""
Read-Host "按回车键退出"
