import { Movies, CrewMembers } from "./sync.js";

//autentificare in BD
async function sequelizeAuth(sequelizeConnection){
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has successfully connected to the database!");
    } catch (err) {
        console.error(
            `There was an error connecting to the databse using sequelize : ${err}`
        );
    }
}

async function sequelizeSync(sequelizeConnection){
    try {
        await sequelizeConnection.sync({force: false, alter: true});
        console.log("Sync completed!");
    } catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}

async function sequelizeInit(sequelizeConnection){
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
}



/* Tabela Movies */

async function getMovies() {
    try {
        return await Movies.findAll(); 
    } catch (err) {
        console.log(err); 
    }
}

async function getMovieById(movieId) {
    try {
        return await Movies.findAll({ where: { movieId } }); 
    } catch (err) {
        console.log(err); 
    }
}

async function createMovie(movie) {
    try{
      await Movies.create({
        title: movie.title,
        category: movie.category,
        publication_date: movie.publication_date
      });
    } catch(err) {
        console.log(err);
    }
}

async function updateMovie(movieId, movie) {
    try{
        const record = await Movies.findByPk(movieId);
        if(record) await record.update ({
            title: movie.title,
            category: movie.category,
            publication_date: movie.publication_date
        });
    } catch(err){
        console.log(err);
    }
}

async function deleteMovie(movieId) {
    try{
        const record = await Movies.findByPk(movieId);
        if(record) await record.destroy();
    } catch(err){
        console.log(err);
    }
}

/* Tabela CrewMembers */

async function getCrewMembers() {
    try {
        return await CrewMembers.findAll(); 
    } catch (err) {
        console.log(err); 
    }
}

async function getCrewMemberById(memberId) {
    try {
        return await CrewMembers.findAll({ where: { memberId } }); 
    } catch (err) {
        console.log(err); 
    }
}

async function getMoviesWithCrewMemberId(memberId) {
    try{
        return await Movies.findAll({
          include: [
            {
              model: CrewMembers,
              where: { memberId }
            }
          ]
        });
    } catch(err){
        console.log(err);
    }
}

async function getCrewMembersOfMovieId(movieId){
    try {
        const movie = await Movies.findByPk(movieId, {
            include: [CrewMembers]
        });
        if(movie) {
            let { CrewMembers: crewMembers } = movie;
            return crewMembers;
        }
        else{
            console.log(`MovieId ${movieId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}

async function getMoviesWithCrewMembers() {
    try{
        return await Movies.findAll({
        include: [
          {
            model: CrewMembers,
            as: "CrewMembers",
          }
        ]
      });
    } catch(err){
        console.log(err);
    }
  }

async function createCrewMemberForMovieId(movieId, crew_member) {
    try {
        const record = await Movies.findByPk(movieId);
        if(record){
            let crewMember = await CrewMembers.create({
                name: crew_member.name,
                role: crew_member.role,
                movieId: record.movieId
              });
            await crewMember.save();
        }
        else{
            console.log(`MovieId ${movieId} not found!`);
        }   
    } catch (err) {
        console.log(err);
    }
}

async function createMovieWithCrewMembers(movie) {
    let result = await Movies.create({
        title: movie.title,
        category: movie.category,
        publication_date: movie.publication_date
      });
      let { CrewMembers: crewMembers } = movie;
      crewMembers.forEach((crewMember) => {
        CrewMembers.create({
            name: crewMember.name,
            role: crewMember.role,
            movieId: result.movieId, // TODO vezi daca e bn asa
        });
      });
}

async function updateCrewMemberById(memberId, crewMember) {
    try{
        const crew_member = await CrewMembers.findByPk(memberId);
        if(crew_member) await crew_member.update ({
            name: crewMember.name,
            role: crewMember.role,
        });
    } catch(err){
        console.log(err);
    }
}

async function updateCrewMemberOfMovieId(movieId, memberId, crewMember){
    try {
        const movie = await Movies.findByPk(movieId, {
            include: [CrewMembers],
            where: { memberId }
        });
        if(movie) {
            const crew_member = await CrewMembers.findByPk(memberId);
            if(crew_member) {
                await crew_member.update({
                    name: crewMember.name,
                    role: crewMember.role,
                });
                await crew_member.save();
            }   
            else{
                console.log(`MemberId ${memberId} not found!`); 
            }
        }
        else{
            console.log(`MovieId ${movieId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}

async function deleteCrewMemberById(memberId) {
    try{
        const crew_member = await CrewMembers.findByPk(memberId);
        if(crew_member) await crew_member.destroy();
    } catch(err){
        console.log(err);
    }
}

async function deleteCrewMemberOfMovieId(movieId, memberId){
    try {
        const movie = await Movies.findByPk(movieId, {
            include: [CrewMembers],
            where: { memberId }
        });
        if(movie) {
            const crew_member = await CrewMembers.findByPk(memberId);
            if(crew_member) {
                await crew_member.destroy();
            }   
            else{
                console.log(`MemberId ${memberId} not found!`); 
            }
        }
        else{
            console.log(`MovieId ${movieId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}


//expunem metodele ca sa le folosim in sync.js
export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    getMovies,
    getMovieById,

    createMovie,
    updateMovie,
    deleteMovie,

    getCrewMembers,
    getCrewMemberById,
    getMoviesWithCrewMemberId,
    getCrewMembersOfMovieId,
    getMoviesWithCrewMembers,

    createCrewMemberForMovieId,
    createMovieWithCrewMembers,

    updateCrewMemberById,
    updateCrewMemberOfMovieId,
    
    deleteCrewMemberById,
    deleteCrewMemberOfMovieId
};