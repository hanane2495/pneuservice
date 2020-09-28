import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components 
import PneuAuto from './screens/PneuAuto'
import Promo from './screens/Promos'
import PneuAgro from './screens/PneuAgro'
import PneuMoto from './screens/PneuMoto'
import PneuPL from './screens/PneuPoidsLourd'
import Footer from './components/Footer'
import SearchResult from './components/SearchResult'
import SearchResultPL from './screens/SearchResultPL'
import SearchResultM from './screens/SearchResultsM'
import SearchResultAg from './screens/SearchResultAg'
import DetailsPneu from './screens/DetailsPneu'
import DetailsPneuMoto from './screens/DetailsPneuMoto'
import DetailsPneuPL from './screens/DetailsPneuPL'
import DetailsPneuAg from './screens/DetailsPneuAgricole'

function App() {
  return (
    <React.Fragment>
      <Router basename='/'>
        <Switch>
          <Route exact path='/' component={props => <PneuAuto />}/>
          <Route path='/pneu-moto' component={props => <PneuMoto />}/>
          <Route path='/pneu-poids-lourds' component={props => <PneuPL />}/>
          <Route path='/pneu-agricole' component={props => <PneuAgro />}/>
          <Route path='/promos' component={props => <Promo />}/>

          <Route path='/details/pneu/auto/:id_pneu/:designation' component={props => <DetailsPneu/>}/>
          <Route path='/details/pneu/moto/:id_pneu/:designation' component={props => <DetailsPneuMoto/>}/>
          <Route path='/details/pneu/poids-lourd/:id_pneu/:designation' component={props => < DetailsPneuPL/>}/>
          <Route path='/details/pneu/agricole/:id_pneu/:designation' component={props => <DetailsPneuAg/>}/>

          <Route path='/selection/pneus-auto/largeur=:largeur/hauteur=:hauteur/diametre=:diametre/charge=:charge/vitesse=:vitesse/marque=:marque' component={props => <SearchResult/>}/>
          <Route path='/selection/pneus-poids-lourd/largeur=:largeur/hauteur=:hauteur/diametre=:diametre/type=:type/position=:position/marque=:marque' component={props => <SearchResultPL/>}/>
          <Route path='/selection/pneus-moto/largeur=:largeur/hauteur=:hauteur/diametre=:diametre/charge=:charge/vitesse=:vitesse/type=:type/position=:position/marque=:marque' component={props => <SearchResultM/>}/>
          <Route path='/selection/pneus-agricole/largeur=:largeur/hauteur=:hauteur/diametre=:diametre/type=:type/marque=:marque' component={props => <SearchResultAg/>}/>
        </Switch>
        <Footer/>
      </Router>
    </React.Fragment>
  );
}

export default App;
