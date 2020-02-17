require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../models/user')
const Project = require('../models/project')
const bcrypt = require("bcrypt")
const bcryptSalt = 10;

const1 = new mongoose.mongo.ObjectId();
const2 = new mongoose.mongo.ObjectId();
const3 = new mongoose.mongo.ObjectId();
const4 = new mongoose.mongo.ObjectId();
const5 = new mongoose.mongo.ObjectId();
const6 = new mongoose.mongo.ObjectId();


const nombres = ["Filogonia", "Digna Marciana", "Clodoveo", "Licerio", "Vistila", "Firmo", "Filadelfo", "Ninfodora", "Canuto", "Baraquisio", "Austiquiliano", "Virisima"]
const apellidos = ["Perez", "Sanchez", "Fernandez", "Lopez", "Saez", "Rey", "Alvarez"]
const type = ["Economic Maecenas", "Technical Maecenas", "Tourist Maecenas"]

// Nombres Random

const numNombre = Math.floor(Math.random() * 11 + 1);
const numApellidos = Math.floor(Math.random() * 6 + 1);
const numNombre1 = Math.floor(Math.random() * 11 + 1);
const numApellidos1 = Math.floor(Math.random() * 6 + 1);
const numNombre2 = Math.floor(Math.random() * 11 + 1);
const numApellidos2 = Math.floor(Math.random() * 6 + 1);
const numNombre3 = Math.floor(Math.random() * 11 + 1);
const numApellidos3 = Math.floor(Math.random() * 6 + 1);
const numNombre4 = Math.floor(Math.random() * 11 + 1);
const numApellidos4 = Math.floor(Math.random() * 6 + 1);
const numNombre5 = Math.floor(Math.random() * 11 + 1);
const numApellidos5 = Math.floor(Math.random() * 6 + 1);
const numNombre6 = Math.floor(Math.random() * 11 + 1);
const numApellidos6 = Math.floor(Math.random() * 6 + 1);

const numType = Math.floor(Math.random() * 3 + 1)



// nombres[numNombre]
// apellidos[numApellidos]



const dataAdmin = [
  //Administradores
  {
    _id: const1,
    name: "Filogonio",
    lastName: "Ptolomeo",
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: "Filogonio@gmail.com",
    phone: 637125689,
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Admin",
    personalDescription: "Alcade de Burgohondo. Comprometido con la historia de mi pueblo Burgohondo. Necesitamos salvar nuestra historia antes de que se pierda en el olvido",
    economicContribution: 0,
    project_id: const2
  }, {
    _id: const3,
    name: "Marciana",
    lastName: "Freire",
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: "Marciana@gmail.com",
    phone: 645257856,
    location: {
      lat: 42.2172423,
      lon: -8.7139553
    },
    type: "Admin",
    personalDescription: "Granjera en una pequeña aldea de Vigo. No solo quiero vender mis productos, tambien quiero que conozcan mi aldea y sus costumbres",
    economicContribution: 0,
    project_id: const2
  },{
    _id: const5,
    name: "Pepiño",
    lastName: "Nogueira",
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: "Pepiño@gmail.com",
    phone: 645247856,
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Admin",
    personalDescription: "El archivo de Catoria se esta perdiendo y no podemos empezar a restaurarlo por problemas legales, necesitamos de tu ayuda",
    economicContribution: 0,
    project_id: const2
  },
  // Colaboradores

  // nombres[numNombre]
  // apellidos[numApellidos]
  {
    name: nombres[numNombre],
    lastName:  apellidos[numApellidos],
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: `${nombres[numNombre]}`+"@gmail.com",
    phone: "658652893",
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Economic Maecenas",
    personalDescription: "Debemos prestar toda nuestra ayuda para que la memoria de los pueblos no se pierda",
    economicContribution: 100,
    project_id: const2
  },
  {
    name: nombres[numNombre1],
    lastName:  apellidos[numApellidos1],
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: `${nombres[numNombre1]}`+"@gmail.com",
    phone: 689451235,
    type: "Economic Maecenas",
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    personalDescription: "A veces 5 euros pueden suponer la diferencia. Aporta lo que puedas",
    economicContribution: 100,
    project_id: const2
  }, {
    name: nombres[numNombre2],
    lastName:  apellidos[numApellidos2],
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: `${nombres[numNombre2]}`+"@gmail.com",
    phone: "685251435",
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Tourist Maecenas",
    personalDescription: "No solo es hacer turismo en zonas despobladas, es intentar conectar con la gente, saber de ella y sus costumbres",
    economicContribution: 0,
    project_id: const4
  }, {
    name: nombres[numNombre3],
    lastName:  apellidos[numApellidos3],
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: `${nombres[numNombre3]}`+"@gmail.com",
    phone: "685214535",
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Tourist Maecenas",
    personalDescription: "Debemos contactar con todos los que tenemos a nuestro alrededor, en especial con aquellos que parecen abandonados. No es solo turismo es más",
    economicContribution: 0,
    project_id: const4
  }, {
    name: nombres[numNombre4],
    lastName:  apellidos[numApellidos4],
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: `${nombres[numNombre4]}`+"@gmail.com",
    phone: "658745214",
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Technical Maecenas",
    personalDescription: "Abogado comprometido con la españa vaciada",
    economicContribution: 0,
    project_id: const6
  }, {
    name: nombres[numNombre5],
    lastName:  apellidos[numApellidos5],
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: `${nombres[numNombre5]}`+"@gmail.com",
    phone: "652152358",
    location: {
      lat: 42.6695044,
      lon: -8.7307837
    },
    type: "Technical Maecenas",
    personalDescription: "Historiador y restaurador. Hay muchas historias que contar y en las que si no hacemos nada se perderan en el tiempo",
    economicContribution: 0,
    project_id: const6
  },
]


// 40.4131414,-4.7948265 Burgohondo // Casa Consistorial
// 42.6695044,-8.7307837 Catoira // Romeria Vikinga
// 42.2172423,-8.7139553 San Pedro de Sardoma // Productos Naturales

const project = [{
  _id: const2,
  name: "Salvemos la casa consistorial de Burgohondo",
  location: {
    lat: 40.4131414,
    lon: -4.7948265
  }
,
  colaborationType: "Economic Maecenas",
  projectDescription: "Necesitamos dinero para restaurar la casa consistorial del pueblo, ayudanos a que este monumento no caiga en el olvido",
  projectTracking: "Empezando a recopilar dinero",
  totalRaised: 100,
  totalRequired: 30000,
  adminId: const1
}, {
  _id: const4,
  name: "Productos Naturales y charla",
  location: {
    lat: 42.6695044,
    lon: -8.7307837
  },
  colaborationType: "Tourist Maecenas",
  projectDescription: "Ven a esta pequeña aldea de Vigo y compra los productos de mi granja",
  projectTracking: "Comenzando a desarrollar la economia local",
  adminId: const3
}, {
  _id: const6,
  name: "Salvemos el archivo local de Catoira",
  location: {
    lat: 42.2172423,
    lon: -8.7139553
  },
  colaborationType: "Technical Maecenas",
  projectDescription: "Necesitamos ayuda tecnica para comenzar la restauración del archivo local. Abogados para asesoramiento legal y restauradores para empezar el proyecto",
  adminId: const5
}, ]

mongoose
  .connect('mongodb://localhost/starter-code', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    User.deleteMany()
      .then(() => {
        return User.create(dataAdmin);
      })
      .then(() => {
        console.log("succesfully added all the data");
        mongoose.connection.close();
        process.exit(0);
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  })
  .then(x => {
    Project.deleteMany()
      .then(() => {
        return Project.create(project);
      })
      .then(() => {
        console.log("succesfully added all the data");
        mongoose.connection.close();
        process.exit(0);
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });