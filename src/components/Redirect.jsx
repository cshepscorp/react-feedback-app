import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';

function Redirect() {
  const status = 200;
  const navigate = useNavigate();

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  const onClick = () => {
    console.log('oh hey there');
    navigate('/about');
  };
  return (
    <div>
      <h1>Redirect</h1>
      <button className="btn btn-secondary" onClick={onClick}>
        Click to see useNavigate
      </button>
      <Routes>
        {/* must have the asterisk in the initial Route in App for this secondary path to work */}
        <Route path="/show" element={<h3>Hey there yall</h3>} />
      </Routes>
    </div>
  );
}

export default Redirect;
