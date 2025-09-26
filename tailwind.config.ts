import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D47E6',
        card: '#2B2B5A',
        surface: '#0F0D2A', // darker base
      },
      backgroundImage: {
        // brighter purple glow from center/bottom
        'app-gradient':
          'radial-gradient(950px 550px at 55% 70%, #6d2bd8 0%, #3b228a 35%, #0f0d2a 80%)'
      }
    }
  },    
  plugins: []
}
export default config
