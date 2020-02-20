const initialCoords = {
    lat: 40.3925046, 
    lng: -3.700465
  };

function initMap() {
    let mapOptions = {
      center: initialCoords,
      zoom: 6
    }
    myMap = new google.maps.Map(document.querySelector('#map'), mapOptions)
    getProjects()
  }

  function getProjects() {
  
    axios.get("/projects/api")
      .then(response => {
        const projects = response.data
        projectsInMap(projects)
        
      })
      .catch(error => console.log(error))
  }

  function projectsInMap(projects) {
    console.log(projects)
    projects.projects.forEach(project => {
      const center = {
        lat: project.location.coordinates[0],
        lng: project.location.coordinates[1]
      }
      console.log(project.name);
      new google.maps.Marker({
        position: center,
        map: myMap,
        title: project.name,
      })
    })
  }