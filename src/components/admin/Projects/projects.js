import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import customAxios from "../../../custom-axios/custom-axios";
import { UserContext } from "../../../react-hooks/react-hooks";
import PaperList from "./PaperList";
import ProjectList from "./ProjectList";
function Project() {

  let array = [{
    id: 0, name: `Ordinary level`
  },
  { id: 1, name: `Advanced level` },

  { id: 2, name: `Advanced` }
  ]

  const [projectArray, setArray] = useState(array);
  const [projectId, setProjectId] = useState(``);
  let navigate = useNavigate();

  const handleProjectId = (id) => {
    localStorage.setItem("projectId", id)
    setProjectId(id);
  }

  useEffect(() => {
    console.log(`load project list`);

    // async function fetchData() {
    //   // You can await here
    //   const re = await customAxios.post(`/api/users/test`, { name: "chama" })
    //     .then(response => {
    //       if (response.isLogout) {
    //         localStorage.clear();
    //         navigate("/");
    //       }
    //       else {
    //         console.log(`primary`, response.data);
    //       }


    //     })
    //     .catch(err => {

    //     })

    //   return re;
    // }

    // console.log(fetchData())
  }, [])

  useEffect(() => {
    let run = true;
    console.log(`run`, run)
    if (run) console.log("project id change");

    if (localStorage.getItem("aa")) console.log(`have`)
    else console.log(`dont have`)
    return () => {
      run = false;
      console.log(`inside return`)

    }


  }, [projectId])


  return (
    <div>
      <UserContext.Provider value={{ projectArray, handleProjectId }}>
        <ProjectList />
        <PaperList />
      </UserContext.Provider>
    </div>);
}

export default Project;
