const { app } = require('./framework/app');

app.listen(3005, () => {
  console.log('listing to 3005');
});

process.on('uncaughtException', (error, promise) => {
  console.log(`Unhandled Rejection at\n ${promise}\n error: ${error}\n will shutdown process.`);
  process.exit(1);
});
 
 