import React from 'react';
import styles from './Box.module.scss';
import Button from '@material-ui/core/Button';

const Box: React.FC = () => (
  <div className={styles.Box}>
     <Button variant="contained" color="primary">
        Box Component
     </Button>
  </div>
);

export default Box;
