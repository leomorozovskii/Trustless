module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }], // Добавили опцию runtime: 'automatic'
    '@babel/preset-typescript',
  ],
};
