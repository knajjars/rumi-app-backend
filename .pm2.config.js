module.exports = [
  {
    script: './dist/app.js',
    name: 'aprta',
    exec_mode: 'cluster',
    instances: 2
  }
];
