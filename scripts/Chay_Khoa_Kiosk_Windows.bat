@echo off
:: =======================================================================
:: KIDS ENGLISH LEARNING AGENT - CHẾ ĐỘ KIOSK TOÀN MÀN HÌNH KHÓA CỨNG
:: Không thanh URL, Không tabs, Không nút đóng X, Bé không thể thoát ra!
:: =======================================================================
title Kids English Learning Agent - Kiosk Mode Launcher
chcp 65001 > nul
cls
echo.
echo =======================================================================
echo   KHOI DONG KIDS ENGLISH AGENT - CHE DO KIOSK CHUYEN DUNG CHO BE
echo =======================================================================
echo.
echo [*] Dang kiem tra trinh duyet tren may tinh...
echo.

where msedge >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Phat hien Microsoft Edge. Dang khoi chay Kiosk Toan Man Hinh...
    start msedge.exe --kiosk "http://localhost:5174/#/gioi-thieu" --edge-kiosk-type=fullscreen --no-first-run
    goto finish
)

where chrome >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Phat hien Google Chrome. Dang khoi chay Kiosk Toan Man Hinh...
    start chrome.exe --kiosk "http://localhost:5174/#/gioi-thieu" --no-first-run
    goto finish
)

echo [!] Thu khoi dong mac dinh...
start msedge.exe --kiosk "http://localhost:5174/#/gioi-thieu" || start chrome.exe --kiosk "http://localhost:5174/#/gioi-thieu"

:finish
echo.
echo =======================================================================
echo [x] Trinh duyet da vao Che Do Kiosk Khoa Cung thanh cong!
echo [x] Ba / Me co the nhap ma PIN tren man hinh de mo khoa khi can.
echo =======================================================================
timeout /t 3 > nul
exit
