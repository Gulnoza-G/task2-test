const MovieAPI = require("../src/crud");

describe("Testing Movie API", () => {
  let movieApi;

  beforeEach(() => {
    movieApi = new MovieAPI();
  });

  describe("GET requests", () => {
    test("GET /trending/all/week", async () => {
      const mockResponse = {
        status: 200,
        body: {
          results: [{ id: 1, title: "Test Movie" }],
          page: 1,
          total_pages: 1,
          total_results: 1,
        },
      };

      movieApi.request = jest.fn().mockResolvedValue(mockResponse.body);

      const response = await movieApi.getMovie();

      expect(response).toBeDefined();

      const expectedKeys = ["results", "page", "total_pages", "total_results"];
      const receivedKeys = Object.keys(response);
      expect(receivedKeys).toEqual(expect.arrayContaining(expectedKeys));

      const { results } = response;
      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBeGreaterThan(0);

      const movie = results[0];
      expect(movie).toHaveProperty("id");
      expect(movie).toHaveProperty("title");
    });
  });

  describe("POST requests", () => {
    test("POST /movie", async () => {
      const movieData = {
        title: "New Movie",
        description: "A test description",
      };
      const mockResponse = {
        status: 201,
        body: { id: 101, ...movieData },
      };

      movieApi.request = jest.fn().mockResolvedValue(mockResponse.body);

      const response = await movieApi.createMovie(movieData);

      expect(response).toBeDefined();
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("title", "New Movie");
      expect(response).toHaveProperty("description", "A test description");
    });
  });

  describe("PUT requests", () => {
    test("PUT /movie/:id", async () => {
      const updateData = { title: "Updated Title" };
      const mockResponse = {
        status: 200,
        body: { id: "101", title: "Updated Title" },
      };

      movieApi.request = jest.fn().mockResolvedValue(mockResponse.body);

      const response = await movieApi.updateMovie("101", updateData);

      expect(response).toBeDefined();
      expect(response).toHaveProperty("id", "101");
      expect(response).toHaveProperty("title", "Updated Title");
    });
  });

  describe("DELETE requests", () => {
    test("DELETE /movie/:id", async () => {
      const mockResponse = {
        status: 200,
        body: {
          success: true,
          status_code: 13,
          status_message: "The item/record was deleted successfully.",
        },
      };

      movieApi.request = jest.fn().mockResolvedValue(mockResponse.body);

      const response = await movieApi.deleteMovie("101");

      expect(response).toBeDefined();
      expect(response).toHaveProperty("success", true);
      expect(response).toHaveProperty("status_code", 13);
      expect(response).toHaveProperty(
        "status_message",
        "The item/record was deleted successfully."
      );
    });
  });
});
