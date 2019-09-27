import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  

  // async: 이 함수가 비동기라는것을 말해주는것이고 await은 axios로 fetch 해온 data를 모두 로드 할때 까지 기다리라는 말임
  getMovies = async() => {
    const {
      data : {
         data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=like_count&limit=50"
    );
    // state-> movies:movies <- axios에서 가져온 moives임
    this.setState({ movies, isLoading: false });
  }; 

  // componentDidMount: component가 생성되고 호출되는 life Cycle
  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
           ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie 
                  key={movie.id}
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary} 
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default App;
