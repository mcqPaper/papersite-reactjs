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

  const [projectArray, setArray] = useState([]);
  const [projectId, setProjectId] = useState(``);
  const [optionType, setOption] = useState(1);
  const [BackEndError, setBackEndError] = useState(null);
  let navigate = useNavigate();


  /**
   * save project Id
   * @param {string} id project Id
   */
  const handleProjectId = (id) => {
    localStorage.setItem("projectId", id)
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
          let storedId = localStorage.getItem("projectId");

          let projectId = storedId ? storedId : response.data[0].id;
          localStorage.setItem("projectId", projectId);
        }

        else {
          setBackEndError(response.request.statusText);
          localStorage.setItem("hasError", true);
        }
      })
      .catch(err => {
      })

  }, [])


  useEffect(() => {
    if (localStorage.getItem("projectId")) {

      // callPaperApi(localStorage.getItem("projectId"));
    }

  }, [projectId])


  return (
    <div>

      {!localStorage.getItem("hasError") &&
        (<UserContext.Provider value={
          {
            projectArray, handleProjectId, setOption,
            optionArray, optionType, projectId
          }}>
          <ProjectList />
          <PaperList />
        </UserContext.Provider>)}

      {localStorage.getItem("hasError") && (
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
