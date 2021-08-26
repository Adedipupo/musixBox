import React from 'react';
import classes from './Library.module.css';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

interface Props {
  children: React.ReactNode;
}

const Wrapper = (props: Props) => {
  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={pageTransition}
      transition={transit}
      className={classes['wrapper']}
    >
      {props.children}
    </motion.div>
  );
};
export default Wrapper;
