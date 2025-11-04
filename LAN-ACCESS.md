# 🌐 LAN Access Configuration

This guide explains how to access the Euchre game on your Local Area Network (LAN) from other devices.

## 📡 What is LAN Access?

LAN (Local Area Network) access allows you to:
- Play the game on your phone/tablet while running the server on your computer
- Share the game with other people on the same WiFi network
- Test on multiple devices simultaneously
- Access from any device on your home/office network

## ⚙️ Configuration

### Frontend (Vite)

The Vite dev server is configured to listen on all network interfaces:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000,
  }
})
```

**What this means:**
- `0.0.0.0` = Listen on ALL network interfaces (not just localhost)
- The server will be accessible via your computer's IP address
- Other devices on the same network can connect

### Backend (Ruby Sinatra)

The Ruby server is also configured for LAN access:

```ruby
# backend/server.rb
set :bind, '0.0.0.0'  # Listen on all network interfaces
set :port, 4567
```

## 🚀 How to Access on LAN

### Step 1: Find Your Computer's IP Address

#### On Windows:
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.0.x.x)

#### On macOS/Linux:
```bash
ifconfig
# or
ip addr show
```
Look for inet address under your active network interface (en0, wlan0, eth0)

Example output:
```
inet 192.168.1.100 netmask 0xffffff00
```

Your IP is: `192.168.1.100`

#### Quick Method (All OS):
Visit this website from your computer's browser:
- https://whatismyipaddress.com/ (shows public IP)
- Or use: `hostname -I` on Linux/Mac

### Step 2: Start the Servers

**Option A: Development Mode**

Terminal 1 - Start Ruby Backend:
```bash
cd backend
bundle exec ruby server.rb
```
Backend will run on: `http://0.0.0.0:4567`

Terminal 2 - Start React Frontend:
```bash
npm run dev
```
Frontend will run on: `http://0.0.0.0:3000`

**Option B: Production Mode**

Build and serve from Ruby:
```bash
npm run build
cd backend
bundle exec ruby server.rb
```
Serves on: `http://0.0.0.0:4567`

### Step 3: Access from Other Devices

Replace `YOUR_IP` with your actual IP address from Step 1.

**Development Mode:**
- From other devices, visit: `http://YOUR_IP:3000`
- Example: `http://192.168.1.100:3000`

**Production Mode:**
- From other devices, visit: `http://YOUR_IP:4567`
- Example: `http://192.168.1.100:4567`

## 📱 Device Access Examples

### From Phone/Tablet (same WiFi)
```
http://192.168.1.100:3000
```

### From Another Computer (same network)
```
http://192.168.1.100:3000
```

### From Smart TV Browser (same network)
```
http://192.168.1.100:3000
```

## 🔍 Server Startup Messages

When you start the servers, you'll see network information:

**Vite Frontend:**
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

**Ruby Backend:**
```
╔════════════════════════════════════════╗
║      EUCHRE GAME RUBY SERVER           ║
╠════════════════════════════════════════╣
║  Server running at:                    ║
║  http://localhost:4567                 ║
║  Network: http://192.168.1.100:4567    ║
╚════════════════════════════════════════╝
```

Use the Network URL to access from other devices.

## 🛡️ Firewall Configuration

If you can't connect, check your firewall:

### Windows Firewall
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Allow Node.js and Ruby through private networks

Or temporarily:
```powershell
# Allow port 3000 (Vite)
netsh advfirewall firewall add rule name="Euchre Vite" dir=in action=allow protocol=TCP localport=3000

# Allow port 4567 (Ruby)
netsh advfirewall firewall add rule name="Euchre Ruby" dir=in action=allow protocol=TCP localport=4567
```

### macOS Firewall
1. System Preferences → Security & Privacy → Firewall
2. Click "Firewall Options"
3. Allow incoming connections for Node and Ruby

Or command line:
```bash
# Allow Node
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node

# Allow Ruby
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/bin/ruby
```

### Linux (ufw)
```bash
# Allow port 3000
sudo ufw allow 3000/tcp

# Allow port 4567
sudo ufw allow 4567/tcp

# Reload firewall
sudo ufw reload
```

## 🔒 Security Considerations

### Development Mode
- Only accessible within your local network
- Not exposed to the internet
- Safe for home/office use

### Production Considerations
- For internet access, use proper hosting (Heroku, Railway, etc.)
- Use HTTPS with SSL certificates
- Implement authentication if needed
- Use environment variables for sensitive data

## 🐛 Troubleshooting

### Can't Access from Other Devices

**1. Check if servers are running:**
```bash
# Check if ports are listening
netstat -an | grep 3000
netstat -an | grep 4567
```

**2. Verify IP address:**
```bash
# Your IP should NOT be 127.0.0.1 or localhost
ip addr show  # Linux/Mac
ipconfig      # Windows
```

**3. Test local access first:**
```bash
# From the server computer, try:
curl http://localhost:3000
curl http://localhost:4567/health
```

**4. Check firewall:**
```bash
# Temporarily disable to test
sudo ufw disable  # Linux
# Or add rules as shown above
```

**5. Verify same network:**
- All devices must be on the same WiFi/network
- Check IP ranges match (192.168.1.x, 10.0.0.x, etc.)

**6. Try different browser:**
- Some browsers cache DNS
- Try incognito/private mode
- Clear browser cache

### Connection Refused

**Cause:** Server not listening on 0.0.0.0

**Fix:** Verify configuration:
```javascript
// vite.config.js - check host
server: {
  host: '0.0.0.0', // NOT 'localhost'
  port: 3000,
}
```

```ruby
# server.rb - check bind
set :bind, '0.0.0.0'  # NOT 'localhost'
```

### Proxy Issues in Development

The Vite proxy targets `localhost:4567`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:4567',
    changeOrigin: true
  }
}
```

This works because the proxy runs on the server computer. External devices connect to Vite, which proxies API calls locally.

## 📲 Mobile Device Tips

### iOS Safari
- Works great with LAN access
- Add to Home Screen for app-like experience
- Landscape mode recommended

### Android Chrome
- Excellent compatibility
- Install as PWA (Add to Home Screen)
- Full-screen mode available

### Responsive Design
The game is fully responsive:
- Automatically adjusts layout
- Touch-friendly controls
- Mobile-optimized card sizes

## 🎮 Multi-Player Setup (Future)

Current single-player setup allows one player per device viewing the same game state. For true multiplayer:

1. **Session Management:**
   - Implement game rooms
   - Player authentication
   - Turn synchronization

2. **WebSockets:**
   - Real-time updates
   - Action Cable (Ruby)
   - Socket.io alternative

3. **State Synchronization:**
   - Server as source of truth
   - Optimistic UI updates
   - Conflict resolution

## 🔗 Quick Reference

| Setting | Value | Purpose |
|---------|-------|---------|
| Vite Host | `0.0.0.0` | Allow LAN access |
| Vite Port | `3000` | Frontend port |
| Ruby Bind | `0.0.0.0` | Allow LAN access |
| Ruby Port | `4567` | Backend port |

## 📋 Checklist

Before accessing from another device:

- [ ] Both servers are running
- [ ] Obtained computer's IP address
- [ ] Firewall allows ports 3000 and 4567
- [ ] Device is on the same WiFi network
- [ ] Used correct URL format: `http://IP:PORT`
- [ ] Tested on server computer first

## 💡 Pro Tips

1. **Static IP:** Set a static IP on your computer to avoid IP changes
2. **Bookmark:** Save the IP URL on mobile devices
3. **QR Code:** Generate QR code with the URL for easy mobile access
4. **Local DNS:** Use mDNS/Bonjour: `http://hostname.local:3000`
5. **Network Monitor:** Use tools like Fing to see all devices on network

## 🌟 Example Setup

**Server Computer (Windows):**
```
IP: 192.168.1.100
Running: Vite + Ruby
```

**Mobile Phone (Android):**
```
Same WiFi Network
Browser: http://192.168.1.100:3000
Status: Connected ✅
```

**Tablet (iPad):**
```
Same WiFi Network
Browser: http://192.168.1.100:3000
Status: Connected ✅
```

---

## 🎯 Summary

With `host: '0.0.0.0'` configured:
- ✅ Access from any device on your LAN
- ✅ Play on phone while developing on computer
- ✅ Share with family/friends on same network
- ✅ Test on multiple devices simultaneously

**Your game is now accessible across your entire local network! 🌐🎮**
