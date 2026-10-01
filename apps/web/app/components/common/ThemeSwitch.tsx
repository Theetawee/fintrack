import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme/useTheme'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type='button'
      onClick={() => {
        toggleTheme()
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className='inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    >
      {theme === 'dark' ? <Sun className='h-5 w-5 text-amber-500' /> : <Moon className='h-5 w-5 text-gray-500' />}
    </button>
  )
}
