import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Header from './components/Header';
import Card from './shared/Card';
// import FeedbackItem from './components/FeedbackItem';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';
import { FeedbackProvider } from './context/FeedbackContext';
import Post from './components/Post';
import Redirect from './components/Redirect';

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/redirect" element={<Redirect />} /> */}
            <Route path="/redirect/*" element={<Redirect />} />
            <Route path="/post/:id/:name" element={<Post />} />
          </Routes>

          <Card>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>{' '}
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>{' '}
            <NavLink to="/redirect" activeClassName="active">
              Redirect
            </NavLink>
          </Card>
        </div>
        <AboutIconLink />
      </Router>
    </FeedbackProvider>
  );
}

export default App;

// function App() {
//     const title = 'blog post';
//     const body = 'this is my blog post';
//     const comments = [
//       { id: 1, text: 'Comm 1' },
//       { id: 2, text: 'Comm two' },
//       { id: 3, text: 'Comm 3' },
//     ];

//     const loading = false;
//     const showComments = true;
//     const commentBlock = (
//       <div className="comments">
//         <h3>Comments ({comments.length})</h3>
//         <ul>
//           {comments.map((comment, idx) => {
//             <li key={idx}>{comment.text}</li>;
//           })}
//         </ul>
//       </div>
//     );

//     if (loading) return <h1>Loading...</h1>;

//     return (
//       <div className="container">
//         <h1>{title.toUpperCase()}</h1>
//         <p>{body}</p>

//         {showComments && commentBlock}
//       </div>
//     );
//   }

//   export default App;
