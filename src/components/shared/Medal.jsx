import PropTypes from "prop-types";
import Gold from "../../assets/icons/medals/gold.png";
import Silver from "../../assets/icons/medals/silver.png";
import Bronze from "../../assets/icons/medals/bronze.png";
import { MEDALS } from "../../constants/base";

const Medal = ({ medal, className }) => {
  const getMedalImage = (medalType) => {
    switch (medalType) {
      case MEDALS.GOLD:
        return Gold;
      case MEDALS.SILVER:
        return Silver;
      case MEDALS.BRONZE:
      default:
        return Bronze;
    }
  };

  return <img className={className} src={getMedalImage(medal)} alt="medal" />;
};

// PropTypes validation
Medal.propTypes = {
  medal: PropTypes.oneOf([MEDALS.GOLD, MEDALS.SILVER, MEDALS.BRONZE])
    .isRequired,
  className: PropTypes.string,
};

export default Medal;
