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
  const [projectArray, setArray] = useState(array);
  const [paperArray, setPaperArray] = useState([]);
  const [optionType, setOption] = useState(1);
  const [BackEndError, setBackEndError] = useState(null);
  const [projectCreate, setProjectCreate] = useState(false);
  const [projectSearch, setProjectSearch] = useState(``);
  const [project, setProjectData] = useState(``);

  let navigate = useNavigate();


  /**
   * save project Id
   * @param {string} id project Id
   */
  const handleProjectId = (id, name) => {

    let projectData = {
      id: id,
      name: name
    }

    setProjectData(projectData);
    sessionStorage.setItem("project", JSON.stringify(projectData));
  }

  /**
   * Get project List
   */
  useEffect(() => {
    console.log(`search key`, projectSearch);

    customAxios.get(`/api/projects/list`)
      .then(response => {

        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else if (response.request.status === 200) {
          setArray(response.data);

          let project = sessionStorage.getItem(`project`);

          let projectId = project ? JSON.parse(project).id : response.data[0].id;
          let projectName = project ? JSON.parse(project).name : response.data[0].name;

          let projectData = {
            id: projectId,
            name: projectName
          }
          sessionStorage.setItem("project", JSON.stringify(projectData));

          setProjectData(projectData);
        }

        else {
          setBackEndError(response.request.statusText);
          sessionStorage.setItem("hasError", true);
        }
      })
      .catch(err => {
      })

    let storedValue = sessionStorage.getItem("projectCreate");

    //If project create focus to create option
    if (storedValue === "true") setOption(2);

    if (storedValue === null || storedValue === "false") storedValue = false;

    else storedValue = true;

    setProjectCreate(storedValue);

  }, [projectSearch])


  /**
   * Get paper list belongs to  project
   */
  useEffect(() => {

    if (project.id && optionType === 1) {

      customAxios.get(`/api/papers/${project.id}/list`)
        .then(response => {

          if (response.isLogout) {
            localStorage.clear();
            navigate("/");
          }

          else if (response.request.status === 200) {

            setPaperArray(response.data)
          }

          else {
            setBackEndError(response.request.statusText);
            sessionStorage.setItem("hasError", true);
          }
        })
        .catch(err => {
        })


    }


  }, [project.id, optionType])


  return (
    <div>

      {!sessionStorage.getItem("hasError") &&
        (<UserContext.Provider value={
          {
            projectArray, handleProjectId, setOption,
            optionArray, optionType, project, projectCreate, paperArray, setProjectSearch
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
