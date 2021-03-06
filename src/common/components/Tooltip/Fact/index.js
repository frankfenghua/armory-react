import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';
import Icon from 'common/components/Icon';

function extractSubText (data) {
  return (
    data.hit_count ||
    data.field_type ||
    data.value ||
    data.distance ||
    data.finisher_type ||
    `${data.percent}%`
  );
}

const Fact = ({ data }) => {
  let content;

  switch (data.type) {
    case 'Recharge':
      content = (
        <div className={cx(styles.recharge, styles.center)}>
          {data.value} <Icon src={data.icon} size="micro" />
        </div>
      );
      break;

    case 'Damage':
    case 'Number':
    case 'Distance':
    case 'Radius':
    case 'Percent':
    case 'AttributeAdjust':
    case 'Range':
    case 'ComboFinisher':
    case 'ComboField':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}: {extractSubText(data)}
        </div>
      );
      break;

    case 'PrefixedBuff':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          <Icon src={data.prefix.icon} size="mini" />
          {data.prefix.status}
        </div>
      );
      break;

    case 'BuffConversion':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {`Gain ${data.target} based on a Percentage of ${data.source}: ${data.percent}%`}
        </div>
      );
      break;

    case 'NoData':
    case 'Unblockable':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}
        </div>
      );
      break;

    case 'Time':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}: {`${data.duration}s`}
        </div>
      );
      break;

    case 'Buff':
    case 'Type':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.status}{`(${data.duration}s)`}: {data.description}
        </div>
      );
      break;

    default:
      console.error('Missing fact! Report this error to @itsmadou on twitter.', data);
      content = <span />;
      break;
  }

  return <span className={styles.fact}>{content}</span>;
};

Fact.propTypes = {
  data: PropTypes.object,
};

export default Fact;
