export class Movie {
  constructor(id, name, imageUrl) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  static setMovies(movies) {
    return movies.map((movie) => new Movie(movie.id, movie.name, movie.imageUrl));
  }

  static setMovie(movie) {
    return new Movie(movie.id, movie.name, movie.imageUrl);
  }
}
