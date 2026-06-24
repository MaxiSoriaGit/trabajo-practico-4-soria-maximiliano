import { Op } from 'sequelize';
import Movie from '../models/movie.model.js';

// Función auxiliar: valida los datos de una película.
// Devuelve un mensaje de error (string) si algo está mal, o null si todo está OK.
const validateMovieFields = (data) => {
const { title, genre, duration, year, synopsis } = data;

if (!title || typeof title !== 'string' || title.trim() === '') {
    return 'El campo title es obligatorio y debe ser un texto válido.';
}

if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    return 'El campo genre es obligatorio y debe ser un texto válido.';
}

if (duration === undefined || duration === null || duration === '') {
    return 'El campo duration es obligatorio.';
}
if (typeof duration !== 'number' || !Number.isInteger(duration) || duration <= 0) {
    return 'El campo duration debe ser un número entero mayor a cero, sin decimales ni texto.';
}

if (year === undefined || year === null || year === '') {
    return 'El campo year es obligatorio.';
}
const currentYear = new Date().getFullYear();
if (typeof year !== 'number' || !Number.isInteger(year) || year < 1888 || year > currentYear) {
    return `El campo year debe ser un número entero entre 1888 y ${currentYear}.`;
}

if (synopsis !== undefined && synopsis !== null && typeof synopsis !== 'string') {
    return 'El campo synopsis debe ser una cadena de texto.';
}

return null;
};

// GET /api/movies
export const getAllMovies = async (req, res) => {
try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
} catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas.', error: error.message });
}
};

// GET /api/movies/:id
export const getMovieById = async (req, res) => {
try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
    return res.status(404).json({ message: `No se encontró una película con id ${id}.` });
    }

    res.status(200).json(movie);
} catch (error) {
    res.status(500).json({ message: 'Error al buscar la película.', error: error.message });
}
};

// POST /api/movies
export const createMovie = async (req, res) => {
try {
    const errorMessage = validateMovieFields(req.body);
    if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
    }

    const existingMovie = await Movie.findOne({ where: { title: req.body.title } });
    if (existingMovie) {
    return res.status(400).json({ message: `Ya existe una película registrada con el título "${req.body.title}".` });
    }

    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
} catch (error) {
    res.status(500).json({ message: 'Error al crear la película.', error: error.message });
}
};

// PUT /api/movies/:id
export const updateMovie = async (req, res) => {
try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
    return res.status(404).json({ message: `No se encontró una película con id ${id}.` });
    }

    const errorMessage = validateMovieFields(req.body);
    if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
    }

    const existingMovie = await Movie.findOne({
    where: {
        title: req.body.title,
        id: { [Op.ne]: id },
    },
    });
    if (existingMovie) {
    return res.status(400).json({ message: `Ya existe otra película registrada con el título "${req.body.title}".` });
    }

    await movie.update(req.body);
    res.status(200).json(movie);
} catch (error) {
    res.status(500).json({ message: 'Error al actualizar la película.', error: error.message });
}
};

// DELETE /api/movies/:id
export const deleteMovie = async (req, res) => {
try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
    return res.status(404).json({ message: `No se encontró una película con id ${id}.` });
    }

    await movie.destroy();
    res.status(200).json({ message: `Película con id ${id} eliminada correctamente.` });
} catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película.', error: error.message });
}
};