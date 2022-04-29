import { useNavigate } from 'react-router-dom';

function FriendStatus() {
  console.log(`inside`)
  const navigate = useNavigate();
  console.log('new');
  navigate('/');

  // const logout = () => {
  //   // localStorage.removeItem('logged');
  //   console.log('new')
  //   navigate('/')
  // }
  // localStorage.removeItem('logged');

  return;

}

export default FriendStatus;
