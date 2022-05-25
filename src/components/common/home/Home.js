import { useMemo } from 'react';
import Projects from '../../admin/Projects/Project';
import NavBar from '../../nav-bar/NavBar';

function Home() {

  const userTypeArray = {
    ADMIN: 1000,
    EDITOR: 900,
    STUDENT: 100,
    TEACHER: 200
  }


  /**
   * change content according to the user type
   */
  const HomeScreen = useMemo(() => {
    let type = parseInt(localStorage.getItem("userType"));

    if (type === userTypeArray.ADMIN) {
      return <Projects />;

    }
    else {
      return <div></div>
    }

  }, [])


  return (
    <div>
      <NavBar />
      {HomeScreen}
    </div>
  );
}

export default Home;
