import { useEffect, useState } from "react";
import { AiFillFileText, AiFillHome } from "react-icons/ai";
import "./NavBar.css";

function NavBar(props) {
  const [oneShow, setOneShow] = useState(true);
  const [twoShow, setTwoShow] = useState(true);
  const [threeShow, setThreeShow] = useState(true);
  const [fourShow, setFourShow] = useState(true);

  useEffect(() => {
    var userType = localStorage.getItem("userType")
    console.log('user type is ', props.userType)
    console.log(Number(props.userType) === 1000)
    if (Number(userType) === 1000) {
      setOneShow(true)
      setTwoShow(true)
      setThreeShow(true)
      setFourShow(true)
    } else {
      setOneShow(true)
      setTwoShow(false)
      setThreeShow(false)
      setFourShow(false)
    }
  }, [])
  return (
    <div className="nav-bar-container">
      <ul>
        {
          !oneShow ? null :
            <li onClick={() => props.setScreen(1)}>
              <AiFillFileText size={50} style={{ color: 'slategray' }} />
            </li>
        }
        {
          !twoShow ? null :
            <li onClick={() => props.setScreen(2)}>
              <AiFillHome size={50} style={{ color: 'slategray' }} />
            </li>
        }
        {
          !threeShow ? null :
            <li onClick={() => props.setScreen(3)}>
              About
            </li>
        }
      </ul>
    </div>
  );
}

export default NavBar;
