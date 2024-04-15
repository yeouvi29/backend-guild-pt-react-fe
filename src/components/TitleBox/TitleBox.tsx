import { motion } from "framer-motion";

import rainbow from "../../assets/rainbow.png";

import styles from "./styles.module.css";
const TitleBox = () => {
  return (
    <div className={styles.titleBox}>
      <div className={styles.rainbowBox}>
        <motion.img
          src={rainbow}
          transition={{ type: "spring", damping: 10, stiffness: 120 }}
          animate={{ scale: 1.05 }}
          className={styles.rainbow}
          alt="Rainbow"
        />
      </div>
      <h1 className={styles.title}>Todo list</h1>
    </div>
  );
};
export default TitleBox;
