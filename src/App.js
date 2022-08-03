import './App.css';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/header';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/registerpage';
import Footer from './components/footer/footer';
import NotFoundPage from './pages/notfound/notfound';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import HomePage from './pages/home/home';
import QuestionsPage from './pages/questionpage/question';
import AddQuestion from './pages/addquestion/addquestion';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Switch>
        <Route path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <Route path={'/questions'}>
          <QuestionsPage />
        </Route>
        <ProtectedRoute path={'/add'}>
          <AddQuestion />
        </ProtectedRoute>
        <Route exact path={'/'}>
          <HomePage />
        </Route>
        <Route path={'*'}>
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
