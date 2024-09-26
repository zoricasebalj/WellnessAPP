import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import ZaposleniciPregled from './pages/zaposlenici/ZaposleniciPregled'
import ZaposleniciDodaj from './pages/zaposlenici/ZaposleniciDodaj'
import ZaposleniciPromjena from './pages/zaposlenici/ZaposleniciPromjena'


function App() {

  
  return (
    <>
      <NavBarEdunova />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.ZAPOSLENIK_PREGLED} element={<ZaposleniciPregled />} />
        <Route path={RoutesNames.ZAPOSLENIK_NOVI} element={<ZaposleniciDodaj />} />
        <Route path={RoutesNames.ZAPOSLENIK_PROMJENA} element={<ZaposleniciPromjena />} />
      </Routes>
    </>
  )
}

export default App
