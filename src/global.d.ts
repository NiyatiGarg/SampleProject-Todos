// We need to tell TypeScript that when we write "import styles from './styles.css' we mean to load a module (to look for a './styles.css.d.ts').
declare module '*.scss';
declare module '*.css';
declare module '*.sass';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
