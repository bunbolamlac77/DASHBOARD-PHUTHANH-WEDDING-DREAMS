import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'], // Gọi file logo từ thư mục public
      manifest: {
        name: 'Phu Thanh Wedding Dreams', // Tên đầy đủ
        short_name: 'PhuThanh', // Tên ngắn hiện dưới Icon trên màn hình iPhone
        description: 'Hệ thống quản lý Studio Phu Thanh Wedding',
        theme_color: '#0B1410', // Màu Deep Moss (nền đen của bạn)
        background_color: '#0B1410', // Màu lúc app đang load
        display: 'standalone', // Chế độ này giúp ẩn thanh địa chỉ của Safari
        icons: [
          {
            src: 'logo.png', // Đảm bảo bạn có file logo.png trong thư mục /public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})