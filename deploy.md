# InfraGuard-AI YunoHost + GitHub Actions Deploy Rehberi

## Proje Bilgileri

```txt
Repo:
https://github.com/kaankaltakkiran/InfraGuard-AI

Domain:
infraguard-ai.kaankaltakkiran.com

Sunucu path:
 /home/kaan/apps/infraguard-ai

Systemd service:
infraguard-ai.service

Port:
3002
```

---

# 1. DNS Kaydı

Domain panelinde A kaydı ekle:

```txt
Type: A
Name: infraguard-ai
Value: VPS_IP_ADRESIN
TTL: Auto
```

Kontrol:

```bash
dig infraguard-ai.kaankaltakkiran.com
```

---

# 2. YunoHost Domain Ekle

```bash
sudo yunohost domain add infraguard-ai.kaankaltakkiran.com
sudo yunohost domain cert-install infraguard-ai.kaankaltakkiran.com
```

Kontrol:

```bash
sudo yunohost domain list
```

---

# 3. Projeyi Sunucuya Klonla

```bash
mkdir -p /home/kaan/apps

git clone https://github.com/kaankaltakkiran/InfraGuard-AI.git /home/kaan/apps/infraguard-ai

cd /home/kaan/apps/infraguard-ai
```

---

# 4. Node.js Kurulu Değilse Kur

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs
```

Kontrol:

```bash
node -v
npm -v
```

---

# 5. Build Al

```bash
cd /home/kaan/apps/infraguard-ai

npm ci
npm run build
```

---

# 6. Lokal Port Testi

```bash
PORT=3002 npm run start
```

Başka terminalden:

```bash
curl -I http://127.0.0.1:3002
```

Eğer `200 OK` dönüyorsa tamam.

Sonra `CTRL + C` ile kapat.

---

# 7. Systemd Servisi Oluştur

```bash
sudo nano /etc/systemd/system/infraguard-ai.service
```

İçine koy:

```ini
[Unit]
Description=InfraGuard AI Next.js App
After=network.target

[Service]
Type=simple
User=kaan
WorkingDirectory=/home/kaan/apps/infraguard-ai
Environment=NODE_ENV=production
Environment=PORT=3002
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Servisi başlat:

```bash
sudo systemctl daemon-reload
sudo systemctl enable infraguard-ai
sudo systemctl start infraguard-ai
sudo systemctl status infraguard-ai
```

Log kontrol:

```bash
journalctl -u infraguard-ai -f
```

Port kontrol:

```bash
sudo ss -tulpn | grep 3002
curl -I http://127.0.0.1:3002
```

---

# 8. YunoHost Reverse Proxy Kur

YunoHost Admin Panel:

```txt
Applications → Install → Redirect
```

Seçilecek seçenek:

```txt
Reverse-proxy (nginx proxy_pass)
```

HTTP 302 redirect seçme.

Ayarlar:

```txt
Domain:
infraguard-ai.kaankaltakkiran.com

Path:
/

Target:
http://127.0.0.1:3002

Access:
Visitors
```

Kurulumdan sonra:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Test:

```bash
curl -I https://infraguard-ai.kaankaltakkiran.com
```

---

# 9. GitHub Actions SSH Key

Bilgisayarında:

```bash
ssh-keygen -t ed25519 -C "github-actions-infraguard-ai" -f github-actions-infraguard-ai
```

Public key’i sunucuda `kaan` kullanıcısına ekle:

```bash
cat github-actions-infraguard-ai.pub
```

Sunucuda:

```bash
mkdir -p /home/kaan/.ssh
nano /home/kaan/.ssh/authorized_keys
chmod 700 /home/kaan/.ssh
chmod 600 /home/kaan/.ssh/authorized_keys
chown -R kaan:kaan /home/kaan/.ssh
```

---

# 10. GitHub Secrets

Repo → Settings → Secrets and variables → Actions → New repository secret

Ekle:

```txt
VPS_HOST = VPS_IP_ADRESIN
VPS_PORT = 22
VPS_USER = kaan
VPS_SSH_KEY = private key içeriği
```

Private key:

```bash
cat github-actions-infraguard-ai
```

çıktısının tamamı olmalı.

---

# 11. Sudo Yetkisi

Sunucuda:

```bash
sudo visudo
```

En alta ekle:

```txt
kaan ALL=NOPASSWD: /bin/systemctl restart infraguard-ai, /bin/systemctl status infraguard-ai
```

---

# 12. GitHub Actions Workflow

Repo içine şu dosyayı oluştur:

```txt
.github/workflows/deploy.yml
```

İçerik:

```yaml
name: Deploy InfraGuard AI

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to YunoHost VPS
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            set -e

            cd /home/kaan/apps/infraguard-ai

            git fetch origin main
            git reset --hard origin/main

            npm ci
            npm run build

            sudo systemctl restart infraguard-ai
            sudo systemctl status infraguard-ai --no-pager
```

---

# 13. Test

Localde değişiklik yap:

```bash
git add .
git commit -m "setup deploy pipeline"
git push origin main
```

GitHub → Actions kısmından pipeline’ı kontrol et.

---

# 14. Kontrol Komutları

Domain:

```bash
sudo yunohost domain list
```

App listesi:

```bash
sudo yunohost app list
```

Port:

```bash
sudo ss -tulpn | grep 3002
```

Servis:

```bash
sudo systemctl status infraguard-ai
```

Log:

```bash
journalctl -u infraguard-ai -n 100 --no-pager
```

Local app testi:

```bash
curl -I http://127.0.0.1:3002
```

Public site testi:

```bash
curl -I https://infraguard-ai.kaankaltakkiran.com
```

Nginx testi:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

# 15. En Sık Hatalar

## Port kullanılıyor

Hata:

```txt
EADDRINUSE: address already in use :::3002
```

Kontrol:

```bash
sudo ss -tulpn | grep 3002
```

Servis zaten çalışıyorsa manuel `npm run start` çalıştırma.

---

## Yanlış domain’e proxy kurmak

Doğru domain:

```txt
infraguard-ai.kaankaltakkiran.com
```

Yanlışlıkla `redirect.kaankaltakkiran.com` gibi başka domain seçme.

---

## /var/www permission hatası

Projeyi `/var/www` altına koyma.

Doğru path:

```txt
/home/kaan/apps/infraguard-ai
```

---

## SSH authenticate hatası

Public key sunucuda olmalı:

```txt
/home/kaan/.ssh/authorized_keys
```

Private key GitHub Secret içinde olmalı:

```txt
VPS_SSH_KEY
```

---

# Final Akış

```txt
git push origin main
        ↓
GitHub Actions
        ↓
SSH ile VPS
        ↓
cd /home/kaan/apps/infraguard-ai
        ↓
git fetch + git reset
        ↓
npm ci
        ↓
npm run build
        ↓
systemctl restart infraguard-ai
        ↓
https://infraguard-ai.kaankaltakkiran.com
```
