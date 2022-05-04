import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../custom-axios/custom-axios";
import { UserContext } from "../../../react-hooks/react-hooks";
import ErrorMessage from "../../common/Error/ErrorMessage";
import PaperList from "./PaperList";
import ProjectList from "./ProjectList";

/**
 * Use to render project Screen components
 * @returns project screen ui
 */
function Projects() {

  //options in the option array
  const optionArray = [
    { id: 0, name: "Overview" },
    { id: 1, name: "List" },
    { id: 2, name: "Add" }
  ];
  const array = [
    { id: 0, name: "Overview" },
    { id: 1, name: "List" },
    { id: 2, name: "Add" },
    { id: 3, name: "Overview" },
    { id: 4, name: "List" },
    { id: 5, name: "Add" }
  ]
  const [projectArray, setArray] = useState([]);
  const [paperArray, setPaperArray] = useState([]);
  const [projectId, setProjectId] = useState(``);
  const [optionType, setOption] = useState(1);
  const [BackEndError, setBackEndError] = useState(null);
  const [projectCreate, setProjectCreate] = useState(false);

  let navigate = useNavigate();

  /**
   * save project Id
   * @param {string} id project Id
   */
  const handleProjectId = (id) => {
    // localStorage.setItem("projectId", id)
    sessionStorage.setItem(`projectId`, id);
    console.log(id)
    setProjectId(id);
  }

  /**
   * Get project List
   */
  useEffect(() => {

    customAxios.get(`/api/projects/list`)
      .then(response => {

        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else if (response.request.status === 200) {
          setArray(response.data);
          let storedId = sessionStorage.getItem("projectId");

          let projectId = storedId ? storedId : response.data[0].id;
          sessionStorage.setItem("projectId", projectId);
          setProjectId(projectId)
        }

        else {
          setBackEndError(response.request.statusText);
          sessionStorage.setItem("hasError", true);
        }
      })
      .catch(err => {
      })

    let storedValue = sessionStorage.getItem("projectCreate");

    if (storedValue === null) storedValue = false;

    setProjectCreate(storedValue);
  },
    [])


  useEffect(() => {
    if (projectId) {
      console.log('proj', projectId)
      customAxios.get(`/api/papers/${projectId}/list`)
        .then(response => {
          console.log('proj1', projectId)
          if (response.isLogout) {
            localStorage.clear();
            navigate("/");
          }

          else if (response.request.status === 200) {

            setPaperArray(response.data)
            //console.log(paperArray)
          }

          else {
            setBackEndError(response.request.statusText);
            sessionStorage.setItem("hasError", true);
          }
        })
        .catch(err => {
        })

      let storedValue = sessionStorage.getItem("projectCreate");

      if (storedValue === null) storedValue = false;

      setProjectCreate(storedValue);
    }



  }, [projectId])


  return (
    <div>

      {!sessionStorage.getItem("hasError") &&
        (<UserContext.Provider value={
          {
            projectArray, handleProjectId, setOption,
            optionArray, optionType, projectId, projectCreate, paperArray
          }}>
          <ProjectList />
          <PaperList />
        </UserContext.Provider>)}

      {sessionStorage.getItem("hasError") && (
        <ErrorMessage
          message={BackEndError}
          path={"/"}
        >
        </ErrorMessage>
      )}

    </div>
  );

}

export default Projects;
