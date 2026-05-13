import './App.css'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">{t('app.hello')}</h1>
        <p className="text-lg text-gray-600">{t('app.welcome')}</p>
      </div>    
    </>
  )
}

export default App
