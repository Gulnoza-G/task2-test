class MovieAPI {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.apiToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjI2ZDE0NWNmZDkyMWIxOWY3MGE5MmNkNDY4MzE0NiIsIm5iZiI6MTczOTQ5NDA5Ni4yNTIsInN1YiI6IjY3YWU5MmQwMTE2OGRlZGExMDlmODc3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4aB7w8EYLI0HNsvkVnA9r2FTDVWIMjul3hdh-EoqzZs";
    this.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };
  }

  async request(endpoint, method = "GET", body = null) {
    const options = { method, headers: this.headers };
    if (body) options.body = JSON.stringify(body);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      return response.json();
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  getMovie() {
    return this.request("/trending/all/week?language=en-US", "GET");
  }

  createMovie(movieData) {
    return this.request("/movie", "POST", movieData);
  }

  updateMovie(movieId, updateData) {
    return this.request(`/movie/${movieId}`, "PUT", updateData);
  }

  deleteMovie(movieId) {
    return this.request(`/movie/${movieId}`, "DELETE");
  }
}

module.exports = MovieAPI;
