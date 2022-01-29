import "./sync.js";
import { router } from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

/* Tabela Movies */

router.route("/movies").get(async (req, res) => {
  const result = await sequelizeOperationsAPI.getMovies();
  res.status(200).json(result);
});

router.route("/movies/:movieId").get(async (req, res) => {
    const movieId = +req.params.movieId;
    var result = await sequelizeOperationsAPI.getMovieById(movieId);
    res.status(200).json(result);
});

router.route("/movies").post(async (req, res) => {
  const { body } = req;
  try {
    if(!Object.keys(body).length){
      res.status(400).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('title') || !body.hasOwnProperty('category') || !body.hasOwnProperty('publication_date')){
      res.status(400).json({ message: 
      `Malformed request. To create a movie you need: {title: ..., category: ... , publication_date: ...}` });
    }
    else {
      await sequelizeOperationsAPI.createMovie(body);
      res.status(200).json("Movie successfully created!");
    } 
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

router.route("/movies/:movieId").put(async (req, res) => {
  const { params: { movieId }, body } = req;
  try {
    if(!Object.keys(body).length){
        res.status(400).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('title') || !body.hasOwnProperty('category') || !body.hasOwnProperty('publication_date')){
      res.status(400).json({ message: 
      `Malformed request. To create a movie you need: {title: ..., category: ... , publication_date: ...}` });
    }
    else {
      await sequelizeOperationsAPI.updateMovie(+movieId, body);
      res.status(200).json("Movie successfully updated!");
    }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

router.route("/movies/:movieId").delete(async (req, res) => {
  const { params: { movieId } } = req;
  try {
    await sequelizeOperationsAPI.deleteMovie(+movieId);
    res.status(200).json("Movie successfully deleted!");
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

/* Tabela CrewMembers */

router.route("/crew_members").get(async (req, res) => {
  const result = await sequelizeOperationsAPI.getCrewMembers();
  res.status(200).json(result);
});

router.route("/crew_members/:memberId").get(async (req, res) => {
    const memberId = +req.params.memberId;
    var result = await sequelizeOperationsAPI.getCrewMemberById(memberId);
    res.status(200).json(result);
});

router.route("/movies/crew_members/:memberId").get(async (req, res) => {
    const { params: { memberId }} = req;
    const result = await sequelizeOperationsAPI.getMoviesWithCrewMemberId(memberId);
    res.status(200).json(result); 
});

router.route("/movies/:movieId/crew_members").get(async (req, res) => {
    const { params: { movieId }} = req;
    const result = await sequelizeOperationsAPI.getCrewMembersOfMovieId(movieId);
    res.status(200).json(result); 
});

router.route("/moviesWithCrewMembers").get(async (req, res) => {
    var result = await sequelizeOperationsAPI.getMoviesWithCrewMembers();
    res.status(200).json(result);
});

router.route("/movies/:movieId/crew_members").post(async (req, res) => {
  const { params: { movieId }, body } = req;
  try {
  if(!Object.keys(body).length){
      res.status(404).json({ message: "Body is missing" });
  }
  else if(!body.hasOwnProperty('name') || !body.hasOwnProperty('role')){
      res.status(404).json({ message: 
      `Malformed request. Input template for creating a crew member: { name: ..., role: ... }` });
  }
  else {
    await sequelizeOperationsAPI.createCrewMemberForMovieId(+movieId, body);
    res.status(200).json("CrewMember successfully created!");
  }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

router.route("/movieWithCrewMembers").post(async (req, res) => {
  const { body } = req;
  try {
    await sequelizeOperationsAPI.createMovieWithCrewMembers(body);
    res.status(200).json("Movie with CrewMembers successfully created!");
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

router.route("/crew_members/:memberId").put(async (req, res) => {
    const { params: { memberId }, body } = req;
    try {
    if(!Object.keys(body).length){
        res.status(404).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('name') || !body.hasOwnProperty('role')){
      res.status(404).json({ message: 
      `Malformed request. Input template for creating a crew member: { name: ..., role: ... }` });
    }
    else {
      await sequelizeOperationsAPI.updateCrewMemberById(+memberId, body);
      res.status(200).json("CrewMember successfully updated!");
    }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
});

router.route("/movies/:movieId/crew_members/:memberId").put(async (req, res) => {
  const { params: { movieId, memberId }, body } = req;
  try {
    if(!Object.keys(body).length){
      res.status(404).json({ message: "Body is missing" });
  }
  else if(!body.hasOwnProperty('name') || !body.hasOwnProperty('role')){
    res.status(404).json({ message: 
    `Malformed request. Input template for creating a crew member: { name: ..., role: ... }` });
  }
  else {
    await sequelizeOperationsAPI.updateCrewMemberOfMovieId(+movieId, +memberId, body);
    res.status(200).json("CrewMember successfully updated!");
  }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

router.route("/crew_members/:memberId").delete(async (req, res) => {
  const { params: { memberId } } = req;  
  try {
      await sequelizeOperationsAPI.deleteCrewMemberById(+memberId);
      res.status(200).json("CrewMember successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
});

router.route("/movies/:movieId/crew_members/:memberId").delete(async (req, res) => {
  const { params: { movieId, memberId } } = req;
  try {
      await sequelizeOperationsAPI.deleteCrewMemberOfMovieId(+movieId, +memberId);
      res.status(200).json("CrewMember successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
});