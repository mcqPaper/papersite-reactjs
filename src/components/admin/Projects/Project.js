import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../custom-axios/custom-axios";
import { UserContext } from "../../../react-hooks/react-hooks";
import PaperList from "./PaperList";
import ProjectList from "./ProjectList";
function Projects() {

  let array = [{
    id: 0, name: `Ordinary level`
  },
  { id: 1, name: `Advanced level` },

  { id: 2, name: `Advanced` }
  ]

  let optArr = [
    { id: 0, name: "Overview" },
    { id: 1, name: "List" },
    { id: 2, name: "Add" }
  ];

  const [optionArray, setOPtionArray] = useState(optArr);
  const [projectArray, setArray] = useState(array);
  const [projectId, setProjectId] = useState(``);
  const [optionType, setOption] = useState(1);
  let navigate = useNavigate();

  const handleProjectId = (id) => {
    localStorage.setItem("projectId", id)
    setProjectId(id);
  }

  useEffect(() => {

    // customAxios.get(`/api/users/projects`)
    //   .then(response => {
    //     if (response.isLogout) {
    //       localStorage.clear();
    //       navigate("/");
    //     }
    //     else {
    //       console.log(`primary`, response.data);
    //       let storedId = localStorage.getItem("projectId");
    //       let projectId = storedId ? storedId : response.data[0].id;
    //       console.log(`project ID`, projectId);
    //     }


    //   })
    //   .catch(err => {

    //   })

  }, [])

  useEffect(() => {
    if (localStorage.getItem("projectId")) {
      console.log(`new project ID`, localStorage.getItem("projectId"));
      // callPaperApi(localStorage.getItem("projectId"));
    }

  }, [projectId])

  useEffect(() => {
    if (optionType === 2) {

    }
  }, [optionType])


  const callPaperApi = (projectId) => {

    customAxios.get(`/api/users/papers/${projectId}`)
      .then(response => {
        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }
        else {
          console.log(`primary`, response.data);
        }


      })
      .catch(err => {

      })

  }



  return (
    <div>
      <UserContext.Provider value={{ projectArray, handleProjectId, setOption, optionArray, optionType }}>
        <ProjectList />
        <PaperList />
      </UserContext.Provider>
    </div>);
}

export default Projects;
