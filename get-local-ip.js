// Script để lấy IP local của máy
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Bỏ qua địa chỉ internal và IPv6
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

const localIP = getLocalIP();
console.log('\n🌐 IP Local của bạn là:', localIP);
console.log('\n📱 Để quét QR từ điện thoại:');
console.log('1. Đảm bảo điện thoại và máy tính cùng mạng WiFi');
console.log(`2. Mở trình duyệt trên máy tính: http://${localIP}:3000`);
console.log(`3. Mở file client/src/App.jsx`);
console.log(`4. Tìm dòng: const localIP = '192.168.1.100'`);
console.log(`5. Thay đổi thành: const localIP = '${localIP}'`);
console.log('\n✅ Sau đó tạo lại QR code và quét từ điện thoại!\n');

module.exports = getLocalIP;
