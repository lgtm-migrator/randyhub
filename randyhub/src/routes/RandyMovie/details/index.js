import { React, useEffect, useState } from 'react';
import styles from './styles.module.scss';

const MoviesDetails = (props) => {
  const [media, setMedia] = useState({});

  useEffect(() => {
    const { match: { params: { mediaId } } } = props;

    const mediaCache = sessionStorage.getItem(mediaId);
    if (mediaCache !== null) {
      setMedia(JSON.parse(mediaCache));
      return;
    }

    const mediaResult = async () => Promise.all([
      fetch(`https://movie.randyhub.live/media/${mediaId}`).then((r) => r.json()),
      fetch(`https://movie.randyhub.live/media/${mediaId}/poster`).then((r) => r.json()),
    ]);

    mediaResult().then((results) => {
      const m = Object.assign(...results);
      setMedia(m);
      sessionStorage.setItem(mediaId, JSON.stringify(m));
    });
  // eslint-disable-next-line react/destructuring-assignment
  }, [props.match.params]);

  const goBack = () => {
    const { history } = props;
    return history.push('/movies-with-randy');
  };

  if (Object.keys(media).length === 0) {
    return <>Loading...</>;
  }

  return (
    <div className={`${styles['movie-details']}`}>
      <div onKeyPress={goBack} onClick={goBack} tabIndex="0" role="button">Back</div>
      <h1>{media.primaryTitle}</h1>
      { /* Show full uncompressed images */}
      <img src={media.posterUrl.replace(/_V1_.*_.jpg/mg, '._V1_.jpg')} alt={`Poster for ${media.tconst}`} />
    </div>
  );
};

export default MoviesDetails;
