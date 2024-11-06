// Variable de entorno para que no se pueda visualizar
const apiKey = process.env.API_KEY

// Funcion renderHome
const renderHome = async (req, res) => {
    res.render('home.pug')
}

// Funcion getfilms: 
const getfilms = async (req, res) => {
    const title = req.params.title;

    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "False") {
            // Redirige a la vista de error si la película no existe
            return res.status(404).render('error.pug', { 
                error: `La película "${title}" no se encontró. Por favor, intenta con otro título.` 
            });
        }

        // Renderiza la vista de la película si se encontró
        res.status(200).render('film.pug', { 
            title: data.Title,              
            year: data.Year,                
            img: data.Poster,
            director: data.Director,
            genre: data.Genre,
            description: data.Plot
        });

    } catch (error) {
        console.error('Error loading films', error);
        res.status(500).render('error.pug', { 
            error: "Hubo un problema al cargar la película. Inténtalo nuevamente más tarde." 
        });
    }
};

// Funcion postfimls:
// Recibimos el titulo de la pelicula a traves del body. 
// mediante el method: POST, action:'/' de nuestro formulario en home.pug
const postfilms = async (req, res) => {
    const title = req.body.film;
    if (!title || title.trim() === '') {
        return res.render('film', { film: null, error: "Por favor, ingresa un título de película." });
      }
    res.redirect(`/film/${title}`) 
};

// Exportamos las funciones
module.exports = {
    renderHome,
    getfilms,
    postfilms
};