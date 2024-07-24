import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CustomCard.module.scss';

/**
 * CustomCard component displays a card with a title, description, and optional media content.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the card
 * @param {string} props.description - The description of the card
 * @param {Object} [props.media] - The media object for the card
 * @param {('image'|'svg'|'component')} [props.media.type] - The type of media
 * @param {string} [props.media.content] - The content or source of the media
 * @param {React.Component} [props.media.component] - A React component to render (if type is 'component')
 * @param {string} props.linkTo - The route to link to when clicked 
 * @returns {React.Element} A custom card component
 */
const CustomCard = ({ title, description, media, linkTo }) => {
  const renderMedia = () => {
    if (!media) return null;

    switch (media.type) {
      case 'image':
        return <img src={media.content} alt={title} className={styles.image} />;
      case 'svg':
        return <div dangerouslySetInnerHTML={{ __html: media.content }} className={styles.svg} />;
      case 'component':
        const MediaComponent = media.component;
        return <div className={styles.component}><MediaComponent /></div>;
      default:
        return null;
    }
  };

  return (
    <Link to={linkTo} className={styles.cardLink}>
      <div className={styles.customCard}>
        <h3 className={styles.title}>{title}</h3>
        {media && <div className={styles.mediaContainer}>{renderMedia()}</div>}
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  media: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'svg', 'component']),
    content: PropTypes.string,
    component: PropTypes.elementType
  }),
  linkTo: PropTypes.string.isRequired
};

export default CustomCard;