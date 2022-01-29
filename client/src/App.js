import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Movie from './pages/Movie';
import CrewMember from './pages/CrewMember';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/movies/:movieId' component={Movie} />
        <Route path='/crew-members/memberId' component={CrewMember} />
      </Switch>
    </div>
  );
}

export default App;
