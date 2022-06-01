import { useMemo, useState } from 'react';
import Projects from '../../admin/Projects/Project';
import NavBar from '../../nav-bar/NavBar';

function Home(props) {

  const [screen, setScreen] = useState(1);

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
    console.log('screen', screen)
    let type = parseInt(localStorage.getItem("userType"));

    if (type === userTypeArray.ADMIN && screen === 1) {
      return <Projects />;

    }
    if (type === userTypeArray.ADMIN && screen === 2) {
      return <Projects />;

    }
    if (type === userTypeArray.ADMIN && screen === 3) {
      return <div>
        <h1>Screen Two</h1>
      </div>;

    }
    else {
      return <div></div>
    }

  }, [screen])


  return (
    <div>
      <NavBar userType={props.userType} setScreen={setScreen} />
      {HomeScreen}
    </div>
  );
}

export default Home;
